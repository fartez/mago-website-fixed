import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useNavTranslations } from '../translations/navigation';

type DropdownType = 'magotherapy' | 'gallery' | 'results' | null;

export default function Navigation() {
  const { language, setLanguage, getSiteContent } = useLanguage();
  const rawNav = useNavTranslations(language);
  const t = Object.fromEntries(
    Object.entries(rawNav).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent('navigation', k, v) : v])
  ) as typeof rawNav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const hideTimerRef = useRef<number | null>(null);

  const handleMouseEnter = (dropdown: DropdownType) => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img
              src="/images/small_logo.png"
              alt="Mago Clinic"
              className="h-12 md:h-16 w-auto max-w-[200px] md:max-w-[370px]"
            />
          </Link>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-600 font-medium">{t.home}</Link>

            <Link to="/magotherapy" className="hover:text-blue-600 font-medium">{t.magotherapy}</Link>

            <Link to="/faq" className="hover:text-blue-600 font-medium">{t.faq}</Link>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('gallery')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-600 font-medium py-2">
                {t.gallery} ▾
              </button>
              <div
                className={`absolute left-0 bg-white shadow-lg rounded-md min-w-[200px] transition-all duration-200 ${
                  activeDropdown === 'gallery'
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
                style={{ top: '100%' }}
              >
                <div className="py-2">
                  <Link to="/photo-gallery" className="block px-4 py-2 hover:bg-gray-100">{t.photoGallery}</Link>
                  <Link to="/video-gallery" className="block px-4 py-2 hover:bg-gray-100">{t.videoGallery}</Link>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('results')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-600 font-medium py-2">
                {t.results} ▾
              </button>
              <div
                className={`absolute left-0 bg-white shadow-lg rounded-md min-w-[200px] transition-all duration-200 ${
                  activeDropdown === 'results'
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
                style={{ top: '100%' }}
              >
                <div className="py-2">
                  <Link to="/results/general" className="block px-4 py-2 hover:bg-gray-100">{t.general}</Link>
                  <Link to="/results/sielme" className="block px-4 py-2 hover:bg-gray-100">{t.sielme}</Link>
                  <Link to="/results/pigmentary-retinitis" className="block px-4 py-2 hover:bg-gray-100">{t.pigmentaryRetinitis}</Link>
                  <Link to="/results/amblyopia" className="block px-4 py-2 hover:bg-gray-100">{t.amblyopia}</Link>
                  <Link to="/results/glaukoma" className="block px-4 py-2 hover:bg-gray-100">{t.glaukoma}</Link>
                  <Link to="/results/astigmatizm" className="block px-4 py-2 hover:bg-gray-100">{t.astigmatizm}</Link>
                </div>
              </div>
            </div>

            <Link to="/about" className="hover:text-blue-600 font-medium">{t.about}</Link>
            <Link to="/contact" className="hover:text-blue-600 font-medium">{t.contact}</Link>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setLanguage('ge')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'ge' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                GE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'ru' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-blue-600 font-medium">{t.home}</Link>
            <Link to="/magotherapy" className="block py-2 hover:text-blue-600 font-medium">{t.magotherapy}</Link>
            <Link to="/faq" className="block py-2 hover:text-blue-600 font-medium">{t.faq}</Link>
            <Link to="/photo-gallery" className="block py-2 hover:text-blue-600 font-medium">{t.photoGallery}</Link>
            <Link to="/video-gallery" className="block py-2 hover:text-blue-600 font-medium">{t.videoGallery}</Link>
            <Link to="/results/general" className="block py-2 hover:text-blue-600 font-medium">{t.resultsGeneral}</Link>
            <Link to="/results/sielme" className="block py-2 hover:text-blue-600 font-medium">{t.resultsSielme}</Link>
            <Link to="/results/pigmentary-retinitis" className="block py-2 hover:text-blue-600 font-medium">{t.resultsPigmentary}</Link>
            <Link to="/results/amblyopia" className="block py-2 hover:text-blue-600 font-medium">{t.resultsAmblyopia}</Link>
            <Link to="/results/glaukoma" className="block py-2 hover:text-blue-600 font-medium">{t.resultsGlaukoma}</Link>
            <Link to="/results/astigmatizm" className="block py-2 hover:text-blue-600 font-medium">{t.resultsAstigmatizm}</Link>
            <Link to="/about" className="block py-2 hover:text-blue-600 font-medium">{t.about}</Link>
            <Link to="/contact" className="block py-2 hover:text-blue-600 font-medium">{t.contact}</Link>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setLanguage('ge')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'ge' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                GE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`w-8 h-6 rounded text-xs font-bold transition ${
                  language === 'ru' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
