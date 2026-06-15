import { Youtube } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useGalleryTranslations } from '../translations/gallery';
import FloatingButtons from '../components/FloatingButtons';

const galleryRows: Array<{ images: string[]; cols: number }> = [
  { images: ['114-1.jpg', '114-2.jpg', '114-3.jpg'], cols: 3 },
  { images: ['112-1.jpg', '112-2.jpg', '112-3.jpg'], cols: 3 },
  { images: ['111-1.jpg', '111-2.jpg', '111-3.jpg'], cols: 3 },
  { images: ['119-1.jpg', '119-2.jpg'], cols: 2 },
  { images: ['117-1.jpg', '117-2.jpg'], cols: 2 },
  { images: ['118-1.jpg', '118-2.jpg'], cols: 2 },
  { images: ['113-1.jpg', '113-2.jpg'], cols: 2 },
  { images: ['120-1.jpg', '120-2.jpg'], cols: 2 },
  { images: ['121-1.jpg', '121-2.jpg'], cols: 2 },
  { images: ['122-1.jpg', '122-2.jpg'], cols: 2 },
  { images: ['123-1.jpg', '123-2.jpg'], cols: 2 },
  { images: ['124-1.jpg', '124-2.jpg'], cols: 2 },
  { images: ['115-1.jpg', '115-2.jpg'], cols: 2 },
];

export default function PhotoGalleryPage() {
  const { language } = useLanguage();
  const t = useGalleryTranslations(language);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <FloatingButtons />

      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(260px, 40vw, 420px)' }}>
        <img
          src="/images/neurofinal.jpg"
          alt="Photo Gallery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 gap-6">
            <div className="flex items-center justify-center md:justify-start flex-1">
              <h1
                className="text-white font-bold drop-shadow-lg text-center md:text-left"
                style={{ fontSize: 'clamp(24px, 5vw, 48px)', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
              >
                {t.photoGallery}
              </h1>
            </div>

            <div
              className="flex flex-col items-center md:items-end justify-center gap-4"
              style={{ maxWidth: '380px', width: '100%' }}
            >
              <p
                className="text-white font-semibold text-center md:text-right leading-relaxed"
                style={{
                  fontSize: 'clamp(13px, 2vw, 17px)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  backdropFilter: 'blur(2px)',
                }}
              >
                სხვა პაციენტების გამოცდილების და შედეგების და გამოცდილების სანახავად დააჭირეთ აქ
              </p>

              <a
                href="https://www.youtube.com/@magotherapy/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-bold text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                style={{
                  background: '#CC0000',
                  padding: '12px 22px',
                  fontSize: 'clamp(13px, 1.8vw, 16px)',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.25)',
                }}
              >
                <Youtube style={{ width: '22px', height: '22px', flexShrink: 0 }} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: 'rgb(215, 237, 246)', padding: 'clamp(14px, 3vw, 30px)', textAlign: 'center' }}
      >
        <div style={{ height: '12px' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{ fontSize: 'clamp(18px, 4.5vw, 26px)', color: '#003366', fontWeight: 700, lineHeight: 1.35 }}
          >
            {t.thankyou}
          </div>
        </div>
        <div style={{ height: '12px' }} />
      </div>

      <div style={{ textAlign: 'center', backgroundColor: '#00265E', padding: '10px 8px' }}>
        <div style={{ height: '6px' }} />
        <div
          style={{ color: '#FFFFFF', fontSize: 'clamp(18px, 5vw, 36px)', fontWeight: 700, letterSpacing: '0.2em', lineHeight: 1.2 }}
        >
          {t.longTermResults}
        </div>
        <div style={{ height: '6px' }} />
      </div>

      <div style={{ backgroundColor: '#FCFCFC', paddingBottom: '55px' }}>
        {galleryRows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div style={{ height: '14px' }} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {row.images.map((filename, imgIndex) => (
                  <div
                    key={imgIndex}
                    style={{
                      flex: row.cols === 3 ? '1 1 280px' : '1 1 320px',
                      maxWidth: row.cols === 3 ? '380px' : '520px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={`/photogallery/${filename}`}
                      alt={`Gallery ${filename}`}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '4px',
                        transition: 'transform 0.35s ease',
                        cursor: 'zoom-in',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: '14px' }} />
            {rowIndex < galleryRows.length - 1 && (
              <div style={{ backgroundColor: '#00265E', height: '10px' }} />
            )}
          </div>
        ))}
      </div>

      <YouTubeBanner />
      <Footer />
    </div>
  );
}
