import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVisitorCount } from '../hooks/useVisitorCount';
import { useLanguage } from '../contexts/LanguageContext';
import { useFooterTranslations } from '../translations/footer';

export default function Footer() {
  const { total, todayCount, loading } = useVisitorCount();
  const { language, getSiteContent } = useLanguage();
  const rawFooter = useFooterTranslations(language);
  const t = Object.fromEntries(
    Object.entries(rawFooter).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent('footer', k, v) : v])
  ) as typeof rawFooter;

  const formattedTotal = loading ? '48,142' : total.toLocaleString('en-US');

  return (
    <footer className="bg-[#00265E] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">{t.contact}</h4>
            <div className="h-1 w-16 bg-white/30 mb-6"></div>
            <img
              src="/images/small_logo.png"
              alt="Mago Clinic"
              className="h-10 w-auto max-w-[250px] mb-6"
            />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>(+995) 599 506 507 <span className="text-base opacity-75">Viber / WhatsApp</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="break-all">doctormago2018@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>{t.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t.menu}</h4>
            <div className="h-1 w-16 bg-white/30 mb-6"></div>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">{t.home}</Link></li>
              <li><Link to="/magotherapy" className="hover:text-gray-300">{t.magotherapy}</Link></li>
              <li><Link to="/faq" className="hover:text-gray-300">{t.faq}</Link></li>
              <li><Link to="/photo-gallery" className="hover:text-gray-300">{t.gallery}</Link></li>
              <li><Link to="/results/general" className="hover:text-gray-300">{t.results}</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">{t.about}</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">{t.contactLink}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t.followUs}</h4>
            <div className="h-1 w-16 bg-white/30 mb-6"></div>
            <p className="mb-4">{t.followSocial}</p>

            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/eyeclinicMaGo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-lg transition-opacity hover:opacity-85 w-full sm:w-auto"
                style={{ backgroundColor: '#1877F2' }}
              >
                <Facebook className="w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-lg">{t.facebookButton}</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-lg transition-opacity hover:opacity-85 w-full sm:w-auto"
                style={{ backgroundColor: '#FF0000' }}
              >
                <Youtube className="w-6 h-6 flex-shrink-0" />
                <span className="font-bold text-lg">{t.youtubeButton}</span>
              </a>
            </div>

            <div className="mt-6 text-base text-center">
              <div className="font-bold">
                {t.visitorsCount} – <strong>{formattedTotal}</strong>
              </div>
              {!loading && todayCount > 0 && (
                <div className="mt-1 text-white/70 text-sm">
                  +{todayCount.toLocaleString('en-US')} visited today
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-4">
        <div className="container mx-auto px-4 flex justify-center">
          <Link
            to="/admin-login"
            className="text-white/20 hover:text-white/50 text-xs transition-colors"
          >
            ადმინი
          </Link>
        </div>
      </div>
    </footer>
  );
}
