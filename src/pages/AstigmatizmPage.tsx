import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useAstigmatizmTranslations } from '../translations/astigmatizm';
import FloatingButtons from '../components/FloatingButtons';

const videos = [
  'https://www.youtube.com/embed/oxpYCmR03N8',
  'https://www.youtube.com/embed/sV9NEV8YU7Y',
  'https://www.youtube.com/embed/s2HphimurFM',
  'https://www.youtube.com/embed/B_H8QFjcdSA',
  'https://www.youtube.com/embed/k5-q5zMJ-MU',
  'https://www.youtube.com/embed/sg2FMRX4pLQ',
  'https://www.youtube.com/embed/TEQj6xe5kpU',
];

export default function AstigmatizmPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useAstigmatizmTranslations(language);
  const p = 'astigmatizm';
  const t = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent(p, k, v) : v])
  ) as typeof raw;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <FloatingButtons />

      <div className="hidden md:block relative h-[350px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/neurofinal.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-12 px-4">
        <h1 className="text-5xl font-bold tracking-widest mb-8">{t.pageTitle}</h1>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="/newpage/astigmatizm/gogonas.jpg"
                alt="astigmatism"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-left space-y-4">
              <h2 className="text-3xl font-bold">{t.heroTitle1}</h2>
              <h2 className="text-3xl font-bold">{t.heroTitle2}</h2>
              <h2 className="text-3xl font-bold text-right">{t.heroTitle3}</h2>
            </div>
          </div>
          <p className="text-xl mt-10 leading-relaxed">{t.heroClinical}</p>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#00265E] text-white px-8 py-3 rounded-lg text-xl font-bold hover:bg-[#003366] transition"
            >
              {t.consultation}
            </button>
            <a
              href="/contact"
              className="bg-[#8EC8E8] text-[#00265E] px-8 py-3 rounded-lg text-xl font-bold hover:bg-[#6fb8dc] transition text-center"
            >
              {t.contact}
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.definitionText1}</p>
              <p className="text-xl leading-relaxed text-gray-800">{t.definitionText2}</p>
            </div>
            <div>
              <img
                src="/newpage/astigmatizm/ASTIGMATIZM.png"
                alt="astigmatism diagram"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-10 px-4">
        <h2 className="text-4xl font-bold leading-relaxed whitespace-pre-line">
          {t.successRateBanner}
        </h2>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-[#003366] text-center mb-10">
            {t.formsTitle}
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md mb-8">
            <h3 className="text-3xl font-bold text-[#003366] mb-6">{t.congenitalTitle}</h3>
            <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.congenitalText1}</p>
            <p className="text-xl leading-relaxed text-gray-800">{t.congenitalText2}</p>
          </div>

          <div className="bg-[#00265E] text-white rounded-xl p-8 shadow-md mb-8">
            <div className="text-center space-y-3">
              <p className="text-3xl font-bold">{t.adviceTitle}</p>
              <p className="text-3xl font-bold">{t.adviceLine1}</p>
              <p className="text-3xl font-bold">{t.adviceLine2}</p>
              <p className="text-3xl font-bold">{t.adviceLine3}</p>
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-end gap-4 text-right">
              <Link to="/results/amblyopia" className="text-xl font-bold text-white hover:text-gray-300 underline">
                {t.seeMoreAmblyopia}
              </Link>
              <Link to="/results/sielme" className="text-xl font-bold text-white hover:text-gray-300 underline">
                {t.seeMoreSielme}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-3xl font-bold text-[#003366] mb-6 text-center">{t.acquiredTitle}</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xl leading-relaxed text-gray-800">{t.acquiredText}</p>
              </div>
              <div>
                <img
                  src="/newpage/astigmatizm/mozrdilebshi.jpg"
                  alt="acquired astigmatism"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-10 px-4">
        <h2 className="text-5xl font-bold tracking-widest">{t.symptomsBanner}</h2>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#003366] text-center mb-4">{t.childrenTitle}</h2>
          <p className="text-xl leading-relaxed text-gray-800 mb-8 text-center max-w-4xl mx-auto">
            {t.childrenText}
          </p>

          <h3 className="text-2xl font-bold text-[#003366] text-center mb-6">
            {t.childrenSymptomsSubtitle}
          </h3>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {t.childSymptoms.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="text-[#00265E] mt-0.5 flex-shrink-0" size={22} />
                  <p className="text-lg font-bold leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
            <div>
              <img
                src="/newpage/astigmatizm/Tandayolili.jpg"
                alt="astigmatism in children"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#003366] text-center mt-14 mb-6">{t.adultsTitle}</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img
                src="/newpage/astigmatizm/gaoreba.jpg"
                alt="astigmatism in adults"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-3">
              {t.adultSymptoms.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="text-[#00265E] mt-0.5 flex-shrink-0" size={22} />
                  <p className="text-lg font-bold leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-[#003366] text-center mb-10">
            {t.correctionTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.correctionText1}</p>
              <p className="text-xl leading-relaxed text-gray-800">{t.correctionText2}</p>
            </div>
            <div>
              <img
                src="/newpage/astigmatizm/tval-foto.png"
                alt="astigmatism correction"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-10 px-4">
        <h2 className="text-4xl font-bold tracking-widest">
          {t.ownEyesBanner}
        </h2>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-[#003366] mb-8">
            {t.magotherapyTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start mb-6">
            <div>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.magotherapyText1}</p>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.magotherapyText2}</p>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.magotherapyText3}</p>
              <p className="text-xl leading-relaxed text-gray-800 mb-4">{t.magotherapyText4}</p>
              <p className="text-xl leading-relaxed text-gray-800">{t.magotherapyText5}</p>
            </div>
            <div>
              <img
                src="/newpage/astigmatizm/fotoaparat.png"
                alt="magotherapy principle"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <p className="text-right">
            <Link to="/magotherapy" className="text-xl font-bold text-[#003366] hover:underline">
              {t.seeMoreMago}
            </Link>
          </p>
        </div>
      </div>

      <div className="py-4 px-4 text-center">
        <p className="text-2xl font-bold text-[#003366] py-6">{t.since1996}</p>
      </div>

      <div className="bg-[#00265E] text-white text-center py-10 px-4">
        <h2 className="text-3xl font-bold tracking-wider">{t.resultsBanner}</h2>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {t.treatmentResults.map((result, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-lg p-5">
                <div className="w-10 h-10 rounded-full bg-[#00265E] text-white text-lg font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-lg font-bold text-gray-800 pt-1 leading-relaxed">{result}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#D7EDF6] rounded-xl py-6 px-8 text-center">
            <p className="text-2xl font-bold text-[#003366]">{t.successRateResult}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="py-6 px-4 text-center mb-8">
            <h2 className="text-3xl font-bold text-[#003366]">{t.patientVideosTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {videos.map((src, i) => (
              <div key={i} className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={src}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#00265E] text-white px-12 py-4 rounded-xl text-2xl font-bold hover:bg-[#003366] transition shadow-lg"
            >
              {t.contactToday}
            </button>
          </div>
        </div>
      </div>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}
