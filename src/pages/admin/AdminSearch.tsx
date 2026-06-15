import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { homeTranslationsRaw } from '../../translations/adminExports';
import { pageContentDefs } from './pageContentDefinitions';

interface SearchResult {
  pageId: string;
  pageTitle: string;
  fieldKey: string;
  fieldLabel: string;
  lang: string;
  value: string;
  matchStart: number;
  matchEnd: number;
}

interface AdminSearchProps {
  onNavigate: (section: string, fieldKey?: string, lang?: string) => void;
}

type Lang = 'ge' | 'en' | 'ru';

const langLabels: Record<Lang, string> = {
  ge: 'ქართული',
  en: 'English',
  ru: 'Русский',
};

function highlight(text: string, start: number, end: number) {
  return (
    <>
      {text.slice(0, start)}
      <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

export default function AdminSearch({ onNavigate }: AdminSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [dbValues, setDbValues] = useState<Record<string, Record<Lang, Record<string, string>>>>({});
  const [dbLoaded, setDbLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAll = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('page, key, lang, value');

      if (data) {
        const map: Record<string, Record<Lang, Record<string, string>>> = {};
        data.forEach((row: { page: string; key: string; lang: string; value: string }) => {
          if (!map[row.page]) map[row.page] = { ge: {}, en: {}, ru: {} };
          if (row.lang === 'ge' || row.lang === 'en' || row.lang === 'ru') {
            map[row.page][row.lang as Lang][row.key] = row.value;
          }
        });
        setDbValues(map);
      }
      setDbLoaded(true);
    };
    loadAll();
  }, []);

  const getFieldValue = useCallback((page: string, key: string, lang: Lang): string => {
    const dbVal = dbValues[page]?.[lang]?.[key];
    if (dbVal !== undefined) return dbVal;
    return homeTranslationsRaw[page]?.[lang]?.[key] ?? '';
  }, [dbValues]);

  const runSearch = useCallback((q: string) => {
    if (!q.trim() || !dbLoaded) {
      setResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    for (const [pageId, def] of Object.entries(pageContentDefs)) {
      for (const field of def.fields) {
        for (const lang of ['ge', 'en', 'ru'] as Lang[]) {
          const value = getFieldValue(def.page, field.key, lang);
          if (!value) continue;
          const idx = value.toLowerCase().indexOf(lower);
          if (idx !== -1) {
            found.push({
              pageId,
              pageTitle: def.title,
              fieldKey: field.key,
              fieldLabel: field.label,
              lang,
              value,
              matchStart: idx,
              matchEnd: idx + q.length,
            });
          }
        }
      }
    }

    setResults(found.slice(0, 50));
  }, [dbLoaded, getFieldValue]);

  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.pageId, result.fieldKey, result.lang);
    setIsOpen(false);
    setQuery('');
  };

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.pageId]) acc[r.pageId] = [];
    acc[r.pageId].push(r);
    return acc;
  }, {});

  const truncate = (text: string, start: number, end: number, maxLen = 80) => {
    const contextBefore = 20;
    const from = Math.max(0, start - contextBefore);
    const raw = text.slice(from, from + maxLen);
    const newStart = start - from;
    const newEnd = end - from;
    return { text: (from > 0 ? '...' : '') + raw + (from + maxLen < text.length ? '...' : ''), start: newStart + (from > 0 ? 3 : 0), end: newEnd + (from > 0 ? 3 : 0) };
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="ძებნა..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#00265E]/30 focus:border-[#00265E] w-56 transition-all focus:w-72"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute top-full right-0 mt-1.5 w-[480px] max-h-[480px] overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
          {!dbLoaded ? (
            <div className="p-4 text-center text-slate-500 text-sm">იტვირთება...</div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">ვერ მოიძებნა: <span className="font-medium text-slate-700">"{query}"</span></p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500">
                  მოიძებნა <span className="font-semibold text-slate-700">{results.length}</span> შედეგი
                  {results.length === 50 && ' (პირველი 50)'}
                </p>
              </div>
              {Object.entries(groupedResults).map(([pageId, pageResults]) => (
                <div key={pageId}>
                  <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100">
                    <span className="text-xs font-semibold text-[#00265E] uppercase tracking-wide">
                      {pageContentDefs[pageId]?.title}
                    </span>
                  </div>
                  {pageResults.map((r, i) => {
                    const { text: snippet, start: sStart, end: sEnd } = truncate(r.value, r.matchStart, r.matchEnd);
                    return (
                      <button
                        key={`${r.fieldKey}_${r.lang}_${i}`}
                        onMouseDown={(e) => { e.preventDefault(); handleSelect(r); }}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 text-left group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-medium text-slate-600">{r.fieldLabel}</span>
                            <span className="text-xs font-mono text-slate-400">[{r.fieldKey}]</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                              r.lang === 'ge' ? 'bg-blue-100 text-blue-700' :
                              r.lang === 'en' ? 'bg-green-100 text-green-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {langLabels[r.lang as Lang]}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed truncate">
                            {highlight(snippet, sStart, sEnd)}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00265E] transition-colors flex-shrink-0 mt-0.5" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
