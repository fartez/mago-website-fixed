import { useState, useEffect, useRef } from 'react';
import { Check, AlertCircle, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface TextField {
  key: string;
  label: string;
  multiline?: boolean;
  rows?: number;
}

interface PendingScroll {
  fieldKey: string;
  lang: string;
}

interface TextFieldEditorProps {
  page: string;
  fields: TextField[];
  initialValues: Record<string, Record<string, string>>;
  pendingScroll?: PendingScroll | null;
  onScrollComplete?: () => void;
}

type Lang = 'ge' | 'en' | 'ru';

const langLabels: Record<Lang, string> = {
  ge: 'ქართული',
  en: 'English',
  ru: 'Русский',
};

export default function TextFieldEditor({ page, fields, initialValues, pendingScroll, onScrollComplete }: TextFieldEditorProps) {
  const [activeLang, setActiveLang] = useState<Lang>('ge');
  const [values, setValues] = useState<Record<Lang, Record<string, string>>>({
    ge: {},
    en: {},
    ru: {},
  });
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [dbValues, setDbValues] = useState<Record<Lang, Record<string, string>>>({
    ge: {},
    en: {},
    ru: {},
  });
  const { adminEmail, adminPassword } = useAdminAuth();
  const { refreshContent } = useLanguage();
  const scrollExecutedRef = useRef<string | null>(null);

  useEffect(() => {
    const loadDbValues = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('key, lang, value')
        .eq('page', page);

      if (data && data.length > 0) {
        const loaded: Record<Lang, Record<string, string>> = { ge: {}, en: {}, ru: {} };
        data.forEach((row: { key: string; lang: string; value: string }) => {
          if (row.lang === 'ge' || row.lang === 'en' || row.lang === 'ru') {
            loaded[row.lang as Lang][row.key] = row.value;
          }
        });
        setDbValues(loaded);
      }
    };
    loadDbValues();
  }, [page]);

  useEffect(() => {
    if (!pendingScroll) return;

    const scrollKey = `${pendingScroll.fieldKey}_${pendingScroll.lang}`;
    if (scrollExecutedRef.current === scrollKey) return;
    scrollExecutedRef.current = scrollKey;

    const lang = pendingScroll.lang as Lang;
    if (lang === 'ge' || lang === 'en' || lang === 'ru') {
      setActiveLang(lang);
    }

    const fieldKey = pendingScroll.fieldKey;

    const doScroll = () => {
      const el = document.getElementById(`field-${fieldKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedField(fieldKey);
        setTimeout(() => setHighlightedField(null), 2500);
        onScrollComplete?.();
      }
    };

    const timer = setTimeout(doScroll, 150);
    return () => clearTimeout(timer);
  }, [pendingScroll, onScrollComplete]);

  useEffect(() => {
    scrollExecutedRef.current = null;
  }, [page]);

  const getValue = (lang: Lang, key: string): string => {
    if (values[lang][key] !== undefined) return values[lang][key];
    if (dbValues[lang][key] !== undefined) return dbValues[lang][key];
    return initialValues[lang]?.[key] ?? '';
  };

  const handleChange = (key: string, val: string) => {
    setValues(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], [key]: val },
    }));
    setSaved(prev => ({ ...prev, [`${activeLang}_${key}`] : false }));
    setErrors(prev => ({ ...prev, [`${activeLang}_${key}`]: '' }));
  };

  const handleSave = async (key: string) => {
    const saveKey = `${activeLang}_${key}`;
    setSaving(prev => ({ ...prev, [saveKey]: true }));
    setErrors(prev => ({ ...prev, [saveKey]: '' }));

    const val = getValue(activeLang, key);

    try {
      const { data, error } = await supabase.rpc('admin_upsert_content', {
        p_email: adminEmail,
        p_password: adminPassword,
        p_page: page,
        p_key: key,
        p_lang: activeLang,
        p_value: val,
      });

      if (error || !data) {
        setErrors(prev => ({ ...prev, [saveKey]: 'შეცდომა შენახვისას.' }));
      } else {
        setDbValues(prev => ({
          ...prev,
          [activeLang]: { ...prev[activeLang], [key]: val },
        }));
        setSaved(prev => ({ ...prev, [saveKey]: true }));
        setTimeout(() => setSaved(prev => ({ ...prev, [saveKey]: false })), 3000);
        refreshContent();
      }
    } catch {
      setErrors(prev => ({ ...prev, [saveKey]: 'კავშირის შეცდომა.' }));
    }

    setSaving(prev => ({ ...prev, [saveKey]: false }));
  };

  const handleSaveAll = async () => {
    for (const field of fields) {
      await handleSave(field.key);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-1">
          {(['ge', 'en', 'ru'] as Lang[]).map(lang => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeLang === lang
                  ? 'bg-[#00265E] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {langLabels[lang]}
            </button>
          ))}
        </div>
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          ყველას შენახვა
        </button>
      </div>

      <div className="p-6 space-y-5">
        {fields.map(field => {
          const saveKey = `${activeLang}_${field.key}`;
          const currentVal = getValue(activeLang, field.key);
          const isSaving = saving[saveKey];
          const isSaved = saved[saveKey];
          const hasError = errors[saveKey];
          const isHighlighted = highlightedField === field.key;

          return (
            <div
              key={field.key}
              id={`field-${field.key}`}
              className={`group rounded-lg transition-all duration-300 ${
                isHighlighted ? 'ring-2 ring-[#00265E] ring-offset-2 bg-blue-50/40' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">
                  {field.label}
                  <span className="ml-2 text-xs text-slate-400 font-normal font-mono">[{field.key}]</span>
                </label>
                <div className="flex items-center gap-2">
                  {isSaved && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                      შენახულია
                    </span>
                  )}
                  {hasError && (
                    <span className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {hasError}
                    </span>
                  )}
                  <button
                    onClick={() => handleSave(field.key)}
                    disabled={isSaving}
                    className="px-3 py-1 text-xs bg-[#00265E] hover:bg-[#003080] text-white rounded-md transition-all disabled:opacity-60 flex items-center gap-1"
                  >
                    {isSaving ? (
                      <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                    შენახვა
                  </button>
                </div>
              </div>
              {field.multiline !== false ? (
                <textarea
                  value={currentVal}
                  onChange={e => handleChange(field.key, e.target.value)}
                  rows={field.rows ?? 4}
                  className="w-full min-w-[300px] px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00265E]/30 focus:border-[#00265E] transition-all resize-y font-inherit leading-relaxed"
                  style={{ minHeight: '120px' }}
                />
              ) : (
                <input
                  type="text"
                  value={currentVal}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full min-w-[300px] px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00265E]/30 focus:border-[#00265E] transition-all"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
