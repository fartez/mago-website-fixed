import { Youtube, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { youtubeBannerTranslations } from '../translations/shared';

export default function YouTubeBanner() {
  const { language } = useLanguage();
  const t = youtubeBannerTranslations[language];

  return (
    <section className="bg-gradient-to-r from-[#00265E] to-[#003d94] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-5 flex-1">
            <div className="flex-shrink-0 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Youtube className="w-7 h-7 text-white" />
            </div>
            <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
              {t.text}
            </p>
          </div>

          <a
            href="https://www.youtube.com/@magotherapy/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:translate-x-1 group whitespace-nowrap"
          >
            <span>{t.linkLabel}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
