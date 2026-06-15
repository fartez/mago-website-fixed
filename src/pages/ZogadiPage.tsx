import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useZogadiTranslations } from '../translations/zogadi';
import FloatingButtons from '../components/FloatingButtons';

interface DiseaseCardData {
  image: string;
  link?: string;
}

const diseaseImages: DiseaseCardData[] = [
  { image: '/images/AMBLIOPIA.jpg', link: '/results/amblyopia' },
  { image: '/images/retinitis.jpg', link: '/results/pigmentary-retinitis' },
  { image: '/images/ojaxi.jpg', link: '/results/sielme' },
  { image: '/images/gogonas.jpg', link: '/results/astigmatizm' },
  { image: '/images/bebo.jpg', link: '/results/glaukoma' },
  { image: '/images/hipermrtopia.jpg' },
  { image: '/images/MIOPIA1.jpg' },
  { image: '/images/NISTAGM.jpg' },
];

function DiseaseCard({ card, title, description, successRate, link, seeMore }: {
  card: DiseaseCardData;
  title: string;
  description: string;
  successRate: string;
  link?: string;
  seeMore: string;
}) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="h-52 overflow-hidden">
        <img
          src={card.image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-[#003366] mb-4 text-center leading-tight">
          {title}
        </h3>
        <p className="text-gray-700 text-base leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <p className="text-gray-800 text-base font-semibold leading-relaxed mb-4 border-l-4 border-[#00265E] pl-3 bg-blue-50 py-2 rounded-r">
          {successRate}
        </p>
        {link && (
          <div className="text-center mt-auto pt-2">
            <Link
              to={link}
              className="inline-block text-[#003366] font-semibold text-base hover:text-[#00265E] hover:underline transition"
            >
              {seeMore}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ZogadiPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useZogadiTranslations(language);
  const p = 'zogadi';
  const t = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent(p, k, v) : v])
  ) as typeof raw;

  const diseases = raw.diseases.map((d, idx) => ({
    title: getSiteContent(p, `disease_${idx}_title`, d.title),
    description: getSiteContent(p, `disease_${idx}_description`, d.description),
    successRate: getSiteContent(p, `disease_${idx}_successRate`, d.successRate),
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <FloatingButtons />

      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src="/images/neurofinal.jpg"
          alt={t.pageTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {t.pageTitle}
          </h1>
        </div>
      </div>

      <section className="bg-[#00265E] text-white min-h-screen flex flex-col">
        <div className="flex flex-col md:flex-row flex-1 min-h-screen">
          <div className="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 flex flex-col">
            <img
              src="/images/mosacdeli.jpg"
              alt="Magotherapy"
              className="w-full flex-1 object-cover object-center"
              style={{ minHeight: '400px' }}
            />
            <div className="px-6 py-5 bg-[#001e4d]">
              <p className="text-base md:text-lg font-semibold text-blue-100 leading-relaxed">
                {t.clinicallyProven}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16">
            <div className="space-y-6">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
                {t.magoActivates}
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
                {t.restoresResources}
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
                {t.restoresCells}
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
                {t.visionRestores}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 flex flex-wrap justify-center gap-4 px-4 pt-10 pb-2">
        <a
          href="/contact"
          className="inline-block bg-[#00265E] text-white font-bold text-lg px-8 py-4 rounded-lg shadow hover:bg-[#003d99] transition-colors duration-200"
        >
          {t.contactUs}
        </a>
        <a
          href="/magotherapy"
          className="inline-block bg-[#00265E] text-white font-bold text-lg px-8 py-4 rounded-lg shadow hover:bg-[#003d99] transition-colors duration-200"
        >
          {t.seeMoreMago}
        </a>
      </div>

      <section className="pt-8 pb-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366] text-center mb-10">
            {t.visionPossible}
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-auto flex-shrink-0">
              <img
                src="/images/zogadi.jpg"
                alt="Clinic MaGo"
                className="rounded-xl shadow-lg w-full md:w-[360px] object-cover"
                style={{ maxHeight: '320px' }}
              />
            </div>
            <p className="text-gray-800 text-lg leading-relaxed flex-1">
              {t.clinicDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#003366]">
            {t.impossiblePossible}
          </h2>
        </div>
      </section>

      <section className="pb-16 pt-4 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {diseases.map((disease, idx) => (
              <DiseaseCard
                key={idx}
                card={diseaseImages[idx] || { image: '' }}
                title={disease.title}
                description={disease.description}
                successRate={disease.successRate}
                link={diseaseImages[idx]?.link}
                seeMore={t.seeMore}
              />
            ))}
          </div>
        </div>
      </section>

      <YouTubeBanner />
      <Footer />
    </div>
  );
}
