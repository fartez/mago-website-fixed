import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Upload, Check, AlertCircle, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

interface SiteImage {
  id: string;
  key: string;
  page: string;
  label: string;
  url: string;
  updated_at: string;
}

const PAGE_LABELS: Record<string, string> = {
  home: 'მთავარი',
  about: 'ჩვენს შესახებ',
  magotherapy: 'მაგოთერაპია',
  glaukoma: 'გლაუკომა',
  amblyopia: 'ამბლიოპია',
  astigmatizm: 'ასტიგმატიზმი',
  sielme: 'სიელმე',
  pigmenturetinite: 'პიგმენტური რეტინიტი',
  zogadi: 'ზოგადი',
};

export default function ImageManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filterPage, setFilterPage] = useState<string>('all');
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const { adminEmail, adminPassword } = useAdminAuth();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_images')
      .select('*')
      .order('page', { ascending: true });
    if (data) setImages(data);
    setLoading(false);
  };

  const handleFileChange = async (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [key]: 'ფაილი ძალიან დიდია (მაქს. 10MB).' }));
      return;
    }

    setUploading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: '' }));
    setUploaded(prev => ({ ...prev, [key]: false }));

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const fileName = `${key}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(fileName, file, { upsert: true, contentType: file.type });

      if (uploadError) {
        setErrors(prev => ({ ...prev, [key]: 'ატვირთვა ვერ მოხერხდა.' }));
        setUploading(prev => ({ ...prev, [key]: false }));
        return;
      }

      const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      const { data: updateOk, error: updateErr } = await supabase.rpc('admin_upsert_image', {
        p_email: adminEmail,
        p_password: adminPassword,
        p_key: key,
        p_url: publicUrl,
      });

      if (updateErr || !updateOk) {
        setErrors(prev => ({ ...prev, [key]: 'URL-ის განახლება ვერ მოხერხდა.' }));
      } else {
        setImages(prev =>
          prev.map(img => (img.key === key ? { ...img, url: publicUrl } : img))
        );
        setUploaded(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setUploaded(prev => ({ ...prev, [key]: false })), 4000);
      }
    } catch {
      setErrors(prev => ({ ...prev, [key]: 'შეცდომა ატვირთვისას.' }));
    }

    setUploading(prev => ({ ...prev, [key]: false }));
    if (fileInputRefs.current[key]) {
      fileInputRefs.current[key]!.value = '';
    }
  };

  const pages = Array.from(new Set(images.map(img => img.page)));
  const filtered = filterPage === 'all' ? images : images.filter(img => img.page === filterPage);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-slate-600">გვერდი:</span>
        <button
          onClick={() => setFilterPage('all')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            filterPage === 'all'
              ? 'bg-[#00265E] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          ყველა
        </button>
        {pages.map(p => (
          <button
            key={p}
            onClick={() => setFilterPage(p)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filterPage === p
                ? 'bg-[#00265E] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {PAGE_LABELS[p] ?? p}
          </button>
        ))}
        <button
          onClick={loadImages}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          განახლება
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#00265E]/20 border-t-[#00265E] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(img => (
            <div key={img.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="relative bg-slate-100 h-48 overflow-hidden">
                {img.url ? (
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {PAGE_LABELS[img.page] ?? img.page}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm font-medium text-slate-800 mb-0.5">{img.label}</p>
                <p className="text-xs text-slate-400 font-mono mb-3 truncate">{img.key}</p>

                {img.url && (
                  <p className="text-xs text-slate-500 mb-3 truncate">
                    <span className="font-medium">URL:</span> {img.url}
                  </p>
                )}

                <input
                  ref={el => { fileInputRefs.current[img.key] = el; }}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={e => handleFileChange(img.key, e)}
                  className="hidden"
                  id={`file-${img.key}`}
                />

                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`file-${img.key}`}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                      uploading[img.key]
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-[#00265E] hover:bg-[#003080] text-white'
                    }`}
                  >
                    {uploading[img.key] ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                        ატვირთვა...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        სურათის შეცვლა
                      </>
                    )}
                  </label>
                </div>

                {uploaded[img.key] && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                    წარმატებით განახლდა!
                  </div>
                )}
                {errors[img.key] && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors[img.key]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
