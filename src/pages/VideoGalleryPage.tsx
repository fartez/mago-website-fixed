import { Youtube } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useGalleryTranslations } from '../translations/gallery';
import FloatingButtons from '../components/FloatingButtons';

const sectionVideoIds: Record<string, string[]> = {
  sielme: ['R4lKHSBDK2o', 'CMnloViBiN4', 'TbVzKUz2V-w', 'xBo7gHdQxhE', 'cUBmhbOkczg', 'cy13ln--Ts4', 'TKQ9gaSNbeI', '0NH2s9tW78A', 'DWGdUi_oC4I'],
  astigmatizmi: ['k5-q5zMJ-MU', 'sV9NEV8YU7Y', 's2HphimurFM', 'B_H8QFjcdSA', 'oxpYCmR03N8', 'sg2FMRX4pLQ', 'TEQj6xe5kpU'],
  nistagmi: ['cUBmhbOkczg', 'AZzQAHBnOfA', 'DWGdUi_oC4I'],
  glaukoma: ['CxdapRAFg1E', 'zSMA96mXdKw', 'IqIsVsMpbkU', 'ytWK0ePF8S8', '7GGk8oey7TQ', 'CX1RcXSso3M'],
  pigmenturiRetiniti: ['N5IhTHr60LY', 'F4XjuBZXBEE', 'P2MaWhAK14s', '1K_s3xgvbak'],
  ambliopia: ['Le9MTmncPC8', 'adcdz1AOh9Q', 'NzP2psuevmQ', 'rWvuq8IApMI', 'sg2FMRX4pLQ'],
  makulodistrofia: ['fo6nr_5n2R8', '9OcoO-C7M_E', 'nEtR-Gp7yvw', 'l2CoLN_Gf1Y'],
  sorsmxedveloba: ['rWvuq8IApMI', 'LdEsrUWr1_w', 'vmfG2UW1bVY', 'an085-i-pxI', 'V6lufaizmDM'],
  kompiuteruli: ['Y4HN68fHV3E'],
  axlomxedveloba: ['eyHCWdLh0Sc'],
  ushedego: ['2LtpjLAdH-I'],
  soreuli: ['ytWK0ePF8S8', 'adcdz1AOh9Q', 'V6lufaizmDM', 'oxpYCmR03N8'],
};

type SectionKey = keyof typeof sectionVideoIds;

const sectionKeys: SectionKey[] = [
  'sielme', 'astigmatizmi', 'nistagmi', 'glaukoma', 'pigmenturiRetiniti',
  'ambliopia', 'makulodistrofia', 'sorsmxedveloba', 'kompiuteruli',
  'axlomxedveloba', 'ushedego', 'soreuli',
];

function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div
      style={{
        backgroundColor: 'rgb(215, 237, 246)',
        padding: '24px 10px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        {videos.map((videoId, i) => (
          <div
            key={i}
            style={{
              flex: '1 1 320px',
              maxWidth: '420px',
              minWidth: '280px',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Video ${videoId}`}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VideoGalleryPage() {
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
          alt="Video Gallery"
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
                {t.videoGallery}
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
        style={{
          backgroundColor: 'rgb(215, 237, 246)',
          padding: '30px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'clamp(16px, 3vw, 22px)',
              color: '#003366',
              fontWeight: 700,
              lineHeight: 1.45,
            }}
          >
            {t.thankyou}
          </p>
        </div>
      </div>

      <div style={{ paddingBottom: '60px' }}>
        {sectionKeys.map((key, idx) => (
          <div key={key} id={key}>
            <div
              style={{
                backgroundColor: '#00265E',
                padding: '10px 16px',
                textAlign: 'center',
              }}
            >
              {idx !== 0 && <div style={{ height: '6px' }} />}
              <a href={`#${key}`} style={{ textDecoration: 'none' }}>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(18px, 4vw, 32px)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    lineHeight: 1.3,
                  }}
                >
                  {t[key as keyof typeof t]}
                </span>
              </a>
              <div style={{ height: '6px' }} />
            </div>

            <VideoGrid videos={sectionVideoIds[key]} />
          </div>
        ))}
      </div>

      <YouTubeBanner />
      <Footer />
    </div>
  );
}
