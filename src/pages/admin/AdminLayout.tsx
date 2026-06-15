import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  Info,
  Phone,
  HelpCircle,
  Stethoscope,
  Eye,
  BookOpen,
  Globe,
  MessageSquare,
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminSearch from './AdminSearch';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'დაფა', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'text', label: 'ტექსტის მართვა', icon: <FileText className="w-4 h-4" />, section: 'ტექსტი' },
  { id: 'images', label: 'სურათების მართვა', icon: <Image className="w-4 h-4" />, section: 'სურათები' },
];

const pageNavItems: NavItem[] = [
  { id: 'page_home', label: 'მთავარი გვერდი', icon: <Home className="w-4 h-4" /> },
  { id: 'page_navigation', label: 'ნავიგაცია', icon: <Globe className="w-4 h-4" /> },
  { id: 'page_footer', label: 'ქვედა ბარი', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'page_about', label: 'ჩვენს შესახებ', icon: <Info className="w-4 h-4" /> },
  { id: 'page_contact', label: 'კონტაქტი', icon: <Phone className="w-4 h-4" /> },
  { id: 'page_faq', label: 'კითხვა-პასუხი', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'page_magotherapy', label: 'მაგოთერაპია', icon: <Stethoscope className="w-4 h-4" /> },
  { id: 'page_booking', label: 'ჩაწერა', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'page_glaukoma', label: 'გლაუკომა', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_amblyopia', label: 'ამბლიოპია', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_astigmatizm', label: 'ასტიგმატიზმი', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_sielme', label: 'სიელმე', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_pigmenturetinite', label: 'პიგმენტური რეტინიტი', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_zogadi', label: 'ზოგადი შედეგები', icon: <Eye className="w-4 h-4" /> },
  { id: 'page_gallery', label: 'გალერეა', icon: <Image className="w-4 h-4" /> },
];

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearchNavigate?: (section: string, fieldKey?: string, lang?: string) => void;
}

export default function AdminLayout({ children, activeSection, onSectionChange, onSearchNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, adminEmail } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const isTextSection = activeSection.startsWith('page_');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed left-0 top-0 h-full z-40 bg-[#00265E] text-white transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm">MaGo ადმინი</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  (activeSection === item.id || (item.id === 'text' && isTextSection))
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </div>

          {sidebarOpen && (
            <>
              <div className="px-4 mt-5 mb-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">გვერდები</p>
              </div>
              <div className="px-2 space-y-0.5">
                {pageNavItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                      activeSection === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                    {activeSection === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-xs text-white/50 truncate">{adminEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">გამოსვლა</span>}
          </button>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              {activeSection === 'dashboard' && 'დაფა'}
              {activeSection === 'text' && 'ტექსტის მართვა'}
              {activeSection === 'images' && 'სურათების მართვა'}
              {activeSection === 'page_home' && 'მთავარი გვერდი — ტექსტი'}
              {activeSection === 'page_navigation' && 'ნავიგაცია — ტექსტი'}
              {activeSection === 'page_footer' && 'ქვედა ბარი — ტექსტი'}
              {activeSection === 'page_about' && 'ჩვენს შესახებ — ტექსტი'}
              {activeSection === 'page_contact' && 'კონტაქტი — ტექსტი'}
              {activeSection === 'page_faq' && 'კითხვა-პასუხი — ტექსტი'}
              {activeSection === 'page_magotherapy' && 'მაგოთერაპია — ტექსტი'}
              {activeSection === 'page_booking' && 'ჩაწერა — ტექსტი'}
              {activeSection === 'page_glaukoma' && 'გლაუკომა — ტექსტი'}
              {activeSection === 'page_amblyopia' && 'ამბლიოპია — ტექსტი'}
              {activeSection === 'page_astigmatizm' && 'ასტიგმატიზმი — ტექსტი'}
              {activeSection === 'page_sielme' && 'სიელმე — ტექსტი'}
              {activeSection === 'page_pigmenturetinite' && 'პიგმენტური რეტინიტი — ტექსტი'}
              {activeSection === 'page_zogadi' && 'ზოგადი შედეგები — ტექსტი'}
              {activeSection === 'page_gallery' && 'გალერეა — ტექსტი'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <AdminSearch onNavigate={onSearchNavigate ?? onSectionChange} />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00265E] hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5" />
              საიტის ნახვა
            </a>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
