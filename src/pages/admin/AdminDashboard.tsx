import { useState, useEffect } from 'react';
import { FileText, Image, Users, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [contentCount, setContentCount] = useState<number | null>(null);
  const [imageCount, setImageCount] = useState<number | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const [{ count: cc }, { count: ic }] = await Promise.all([
        supabase.from('site_content').select('*', { count: 'exact', head: true }),
        supabase.from('site_images').select('*', { count: 'exact', head: true }),
      ]);
      setContentCount(cc ?? 0);
      setImageCount(ic ?? 0);
    };
    loadStats();
  }, []);

  const stats = [
    {
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50',
      label: 'შენახული ტექსტები',
      value: contentCount !== null ? contentCount.toString() : '—',
    },
    {
      icon: <Image className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      label: 'სურათების ჩანაწერი',
      value: imageCount !== null ? imageCount.toString() : '—',
    },
    {
      icon: <Users className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50',
      label: 'მხარდაჭერილი ენები',
      value: '3',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50',
      label: 'გვერდები',
      value: '14',
    },
  ];

  const quickActions = [
    { label: 'მთავარი გვერდი', section: 'page_home', color: 'bg-[#00265E]' },
    { label: 'ჩვენს შესახებ', section: 'page_about', color: 'bg-slate-700' },
    { label: 'კონტაქტი', section: 'page_contact', color: 'bg-slate-600' },
    { label: 'მაგოთერაპია', section: 'page_magotherapy', color: 'bg-slate-500' },
    { label: 'ნავიგაცია', section: 'page_navigation', color: 'bg-slate-400' },
    { label: 'სურათები', section: 'images', color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">კეთილი იყოს თქვენი მობრძანება</h2>
        <p className="text-slate-500 text-sm">კლინიკა MaGo — კონტენტის მართვის სისტემა</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          სწრაფი წვდომა
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                const event = new CustomEvent('admin-navigate', { detail: action.section });
                window.dispatchEvent(event);
              }}
              className={`${action.color} text-white text-sm font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-all text-left`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>შენიშვნა:</strong> ნებისმიერი ცვლილება დაუყოვნებლივ ხდება ხელმისაწვდომი საიტზე.
          ყოველი ველის შენახვისთვის დააჭირეთ "შენახვა" ღილაკს.
        </p>
      </div>
    </div>
  );
}
