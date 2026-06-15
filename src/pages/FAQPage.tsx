import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { faqTranslations } from '../translations/faq';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import FloatingButtons from '../components/FloatingButtons';

export default function FAQPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = faqTranslations[language];
  const p = 'faq';

  const title = getSiteContent(p, 'title', raw.title);
  const youtubeNotePrefix = getSiteContent(p, 'youtubeNotePrefix', raw.youtubeNote.prefix);
  const youtubeNoteLinkText = getSiteContent(p, 'youtubeNoteLinkText', raw.youtubeNote.linkText);
  const youtubeNoteUrl = raw.youtubeNote.url;

  const faqs = raw.faqs.map((faq, i) => {
    const n = i + 1;
    const question = getSiteContent(p, `q${n}`, faq.question);
    const answer = faq.showTable ? faq.answer : getSiteContent(p, `a${n}`, faq.answer);
    return { ...faq, question, answer };
  });

  const statisticsTable = raw.statisticsTable.map((stat, i) => {
    const n = i + 1;
    return {
      condition: getSiteContent(p, `stat_condition_${n}`, stat.condition),
      percentage: getSiteContent(p, `stat_pct_${n}`, stat.percentage),
    };
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <FloatingButtons />

      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src="/images/neurofinal.jpg"
          alt="Magotherapy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border-2 rounded-lg overflow-hidden"
                style={{ borderColor: '#00265E' }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-bold text-base md:text-lg leading-snug"
                    style={{ color: '#00265E' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200"
                    style={{
                      borderColor: '#00265E',
                      backgroundColor: isOpen ? '#00265E' : 'transparent',
                      color: isOpen ? '#ffffff' : '#00265E',
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '2000px' : '0px' }}
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {faq.answer}

                      {faq.showTable && (
                        <div className="mt-4">
                          <div
                            className="border-2 rounded-lg overflow-hidden"
                            style={{ borderColor: '#00265E' }}
                          >
                            <div className="p-2">
                              <table className="w-full">
                                <tbody>
                                  {statisticsTable.map((stat, idx) => (
                                    <tr
                                      key={idx}
                                      className="border-b last:border-b-0"
                                      style={{ borderColor: '#e5e7eb' }}
                                    >
                                      <td className="py-3 px-2 text-gray-800">{stat.condition}</td>
                                      <td className="py-3 px-2 text-center font-semibold w-16" style={{ color: '#00265E' }}>
                                        {stat.percentage}
                                      </td>
                                      <td className="w-8"></td>
                                      <td className="py-3 px-2 w-8 font-semibold" style={{ color: '#00265E' }}>%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="mt-4 text-base md:text-lg" style={{ color: '#00265E' }}>
                        {youtubeNotePrefix}
                        <a
                          href={youtubeNoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline hover:opacity-75 transition-opacity"
                          style={{ color: '#00265E' }}
                        >
                          {youtubeNoteLinkText}
                        </a>
                      </p>

                      {faq.video && (
                        <div className="mt-4 relative">
                          <iframe
                            src={faq.video}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full rounded-lg"
                            style={{ height: '315px', maxHeight: '415px' }}
                          />
                          {faq.videoOverlay && (
                            <div
                              className="absolute bottom-3 right-3 text-right pointer-events-none"
                              style={{ maxWidth: '60%' }}
                            >
                              {faq.videoOverlay.split('\n').map((line, li) => (
                                <p
                                  key={li}
                                  className="text-white font-bold leading-tight drop-shadow-lg"
                                  style={{
                                    fontSize: li === 0 ? '0.75rem' : '0.7rem',
                                    textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)',
                                  }}
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <YouTubeBanner />
      <Footer />
    </div>
  );
}
