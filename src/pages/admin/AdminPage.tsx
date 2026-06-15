import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import TextFieldEditor from './TextFieldEditor';
import ImageManager from './ImageManager';
import { pageContentDefs } from './pageContentDefinitions';
import { homeTranslationsRaw } from '../../translations/adminExports';

interface PendingScroll {
  fieldKey: string;
  lang: string;
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [pendingScroll, setPendingScroll] = useState<PendingScroll | null>(null);
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handler = (e: Event) => {
      const section = (e as CustomEvent).detail;
      if (section) setActiveSection(section);
    };
    window.addEventListener('admin-navigate', handler);
    return () => window.removeEventListener('admin-navigate', handler);
  }, []);

  const handleNavigate = useCallback((section: string, fieldKey?: string, lang?: string) => {
    setActiveSection(section);
    if (fieldKey && lang) {
      setPendingScroll({ fieldKey, lang });
    }
  }, []);

  const clearPendingScroll = useCallback(() => {
    setPendingScroll(null);
  }, []);

  if (!isAuthenticated) return null;

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return <AdminDashboard />;
    }

    if (activeSection === 'images') {
      return <ImageManager />;
    }

    if (activeSection === 'text') {
      return (
        <div className="text-center py-12 text-slate-500">
          <p>გვერდის ასარჩევად გამოიყენეთ მარცხენა მენიუ.</p>
        </div>
      );
    }

    const def = pageContentDefs[activeSection];
    if (def) {
      const initialValues = homeTranslationsRaw[def.page] ?? { ge: {}, en: {}, ru: {} };
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            შეასწორეთ ტექსტი სასურველ ენაზე და დააჭირეთ "შენახვა".
            ცვლილებები დაუყოვნებლივ ჩნდება საიტზე.
          </p>
          <TextFieldEditor
            page={def.page}
            fields={def.fields}
            initialValues={initialValues}
            pendingScroll={pendingScroll}
            onScrollComplete={clearPendingScroll}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection} onSearchNavigate={handleNavigate}>
      {renderContent()}
    </AdminLayout>
  );
}
