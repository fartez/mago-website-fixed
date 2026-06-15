import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useAmblyopiaTranslations } from '../translations/amblyopia';
import FloatingButtons from '../components/FloatingButtons';

const videos = [
  'https://www.youtube.com/embed/Le9MTmncPC8',
  'https://www.youtube.com/embed/adcdz1AOh9Q',
  'https://www.youtube.com/embed/NzP2psuevmQ',
  'https://www.youtube.com/embed/sg2FMRX4pLQ',
  'https://www.youtube.com/embed/rWvuq8IApMI',
];

export default function AmblyopiaPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useAmblyopiaTranslations(language);
  const p = 'amblyopia';
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
        <h1 className="text-5xl font-bold tracking-widest mb-6">{t.pageTitle}</h1>
        <p className="text-2xl mb-4">{t.heroSubtitle}</p>
        <p className="text-4xl font-bold mb-6 max-w-4xl mx-auto">{t.heroStrong}</p>
        <p className="text-lg max-w-3xl mx-auto">{t.heroResult}</p>
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

          <h2 className="text-4xl font-bold text-[#003366] text-center mb-10">{t.definitionSectionTitle}</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xl leading-relaxed text-gray-800">
                {t.definition}
              </p>
            </div>
            <div>
              <img
                src="/newpage/100e1155-1f9f-4fd4-b2f2-2f3d3e404581_670x0_resize.jpg"
                alt="amblyopia"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-[#003366] text-center mb-10">
            {t.whyNotSeeTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {t.whySteps.map((text, i) => (
              <div key={i} className="bg-[#D7EDF6] rounded-xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#00265E] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <p className="text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#003366] text-center mb-8">
            {t.binocularTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                {t.binocularText1.split('შერწყმის უნარი ანუ ბინოკოლურალური მხედველობა.')[0]}
                {language === 'ge' ? (
                  <><strong>ირღვევა შერწყმის უნარი ანუ ბინოკოლურალური მხედველობა.</strong></>
                ) : (
                  t.binocularText1
                )}
              </p>
              <p className="text-lg leading-relaxed">
                {t.binocularText2}
              </p>
            </div>
            <div>
              <img
                src="/images/AMBLIOPIA.jpg"
                alt="binocular vision"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-[#003366] text-center mb-10">
            {t.causesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.causes.map((cause) => (
              <div key={cause.num} className="border-2 border-[#00265E] rounded-xl p-6">
                <div className="w-14 h-14 rounded-full bg-[#00265E] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {cause.num}
                </div>
                <h3 className="text-xl font-bold text-[#003366] text-center mb-3">{cause.title}</h3>
                <p className="text-base leading-relaxed text-gray-700">{cause.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/images/d8c9c41a322726df07f26884b2acc310.png"
                alt="child"
                className="w-full max-w-[300px] mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003366] mb-6">
                {t.parentTitle}
              </h2>
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                {t.parentText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#D7EDF6] rounded-xl py-6 px-4 text-center mb-8">
            <h2 className="text-3xl font-bold text-[#003366]">
              {t.symptomsTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {t.symptoms.map((symptom, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <CheckCircle className="text-[#00265E] mt-0.5 flex-shrink-0" size={22} />
                <p className="text-base leading-relaxed">{symptom}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#D7EDF6] rounded-xl py-10 px-6 text-center mt-10">
            <h2 className="text-3xl font-bold text-[#003366] mb-4 whitespace-pre-line">
              {t.seeDocTitle}
            </h2>
            <p className="text-xl font-bold text-[#003366]">
              {t.seeDocText}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-10 bg-[#D7EDF6] rounded-xl p-8">
            <div>
              <img
                src="/newpage/satvale.jpg"
                alt="glasses"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#003366] mb-4">{t.adultsTitle}</h3>
              <p className="text-lg leading-relaxed text-gray-800">
                {t.adultsText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-12 px-4">
        <h2 className="text-4xl font-bold tracking-wider whitespace-pre-line">
          {t.weSeeBrainTitle}
        </h2>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-lg leading-relaxed text-gray-800 mb-10">
            {t.functionalText}
          </p>

          <h2 className="text-3xl font-bold text-[#003366] text-center mb-8">
            {t.normalVisionTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div className="space-y-3">
              {t.normalVisionSteps.map((step, i) => (
                <p key={i} className="text-lg font-bold text-gray-800">{step}</p>
              ))}
            </div>
            <div>
              <img
                src="/newpage/ნორმა.png"
                alt="normal vision"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#003366] text-center mb-8">
            {t.amblyopiaTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/newpage/ამბლიოპია6.jpg"
                alt="amblyopia"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              {t.amblyopiaSteps.map((step, i) => (
                <p key={i} className="text-lg font-bold text-gray-800">{step}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#D7EDF6] rounded-xl py-6 px-4 text-center mb-8">
            <h2 className="text-3xl font-bold text-[#003366]">
              {t.restorationTitle}
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-gray-800 mb-6">{t.restorationText1}</p>
          <p className="text-lg leading-relaxed text-gray-800 mb-6">{t.restorationText2}</p>
          <p className="text-lg leading-relaxed text-gray-800 mb-6">{t.restorationText3}</p>
          <p className="text-right">
            <Link to="/magotherapy" className="text-xl font-bold text-[#003366] hover:underline">
              {t.seeMoreMago}
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-10 px-4">
        <h2 className="text-3xl font-bold tracking-wider">
          {t.resultsTitle}
        </h2>
      </div>

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-1 gap-4">
            {t.results.map((result, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-0">
                <div className="w-10 h-10 rounded-full bg-[#00265E] text-white text-lg font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-lg font-bold text-gray-800 pt-1">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="py-6 px-4 text-center mb-8">
            <h2 className="text-3xl font-bold text-[#003366]">
              {t.patientVideosTitle}
            </h2>
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
