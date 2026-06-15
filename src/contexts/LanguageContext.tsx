import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type Language = 'ge' | 'en' | 'ru';

const STORAGE_KEY = 'preferred_language';

interface SiteContent {
  [page: string]: {
    [lang: string]: {
      [key: string]: string;
    };
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getSiteContent: (page: string, key: string, fallback: string) => string;
  refreshContent: () => Promise<void>;
  contentLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language?.toLowerCase() || '';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('en')) return 'en';
  return 'ge';
}

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === 'ge' || stored === 'en' || stored === 'ru') return stored;
  } catch {
  }
  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [siteContent, setSiteContent] = useState<SiteContent>({});
  const [contentLoaded, setContentLoaded] = useState(false);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('site_content')
        .select('page, key, lang, value');

      if (data && data.length > 0) {
        const built: SiteContent = {};
        for (const row of data) {
          if (!built[row.page]) built[row.page] = {};
          if (!built[row.page][row.lang]) built[row.page][row.lang] = {};
          built[row.page][row.lang][row.key] = row.value;
        }
        setSiteContent(built);
      }
    } catch {
    }
    setContentLoaded(true);
  };

  useEffect(() => {
    loadContent();
  }, []);

  const refreshContent = async () => {
    await loadContent();
  };

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
    }
    setLanguageState(lang);
  };

  const getSiteContent = (page: string, key: string, fallback: string): string => {
    const val = siteContent?.[page]?.[language]?.[key];
    return val !== undefined && val !== '' ? val : fallback;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getSiteContent, refreshContent, contentLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
