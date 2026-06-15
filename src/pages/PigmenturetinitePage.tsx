import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { usePigmenturetiniteTranslations } from '../translations/pigmenturetinite';
import FloatingButtons from '../components/FloatingButtons';

export default function PigmenturetinitePage() {
  const { language, getSiteContent } = useLanguage();
  const raw = usePigmenturetiniteTranslations(language);
  const p = 'pigmenturetinite';
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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg text-center">
            {t.pageTitle1}
          </h1>
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg text-center">
            {t.pageTitle2}
          </h1>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-white mb-6 md:hidden">
            {t.pageTitle1} {t.pageTitle2}
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src="/images/retinitis_saTauris_suraTi.jpg"
                alt="პიგმენტური რეტინიტი"
                className="w-full max-w-[500px] h-[280px] object-cover rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-3">
              <p className="text-xl font-bold leading-relaxed">{t.heroText1}</p>
              <p className="text-xl font-bold leading-relaxed">{t.heroText2}</p>
              <p className="text-xl font-bold leading-relaxed">{t.heroText3}</p>
              <p className="text-xl font-bold leading-relaxed">{t.heroText4}</p>
            </div>
          </div>
          <p className="text-lg text-center mt-6">{t.resultInOneHour}</p>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
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

          <p className="text-3xl font-bold text-[#003366] mb-4">{t.definitionTitle}</p>

          <div className="flex flex-col md:flex-row gap-8 items-start mb-3">
            <p className="text-xl leading-relaxed md:w-1/2">{t.definition1}</p>
            <div className="md:w-1/2 flex justify-center flex-shrink-0">
              <img
                src="/images/xelebi.jpg"
                alt="პიგმენტური რეტინიტი"
                className="w-full max-w-[500px] h-[280px] object-cover rounded"
              />
            </div>
          </div>

          <p className="text-xl leading-relaxed mb-3">{t.definition2}</p>
          <p className="text-xl leading-relaxed mb-3">{t.definition3}</p>
          <p className="text-xl leading-relaxed mb-3">{t.definition4}</p>
          <p className="text-xl leading-relaxed font-bold mb-3">{t.definition5}</p>
          <p className="text-xl leading-relaxed font-bold">{t.definition6}</p>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366] mb-2">{t.distrophiesTitle1}</p>
        <p className="text-3xl font-bold text-[#003366] mb-8">{t.distrophiesTitle2}</p>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/gasinjva_ru.png"
              alt="გასინჯვა"
              className="w-full max-w-[400px] h-auto object-cover rounded"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {t.distrophies.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-lg font-bold text-[#003366]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#003366] text-center mb-6">
            {t.initialSymptomsTitle}
          </h2>
          <p className="text-xl leading-relaxed mb-6">{t.initialSymptomsText}</p>

          <p className="text-3xl font-bold text-[#003366] text-center mb-6">
            {t.childrenWarning}
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/3 space-y-4">
              <p className="text-xl leading-relaxed">{t.childrenText1}</p>
              <p className="text-xl leading-relaxed">{t.childrenText2}</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/images/retiniti2.jpg"
                alt="ბადურა"
                className="w-full max-w-[350px] h-[280px] object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-4xl font-bold text-[#003366] text-center mb-8">
            {t.primarySymptomsTitle}
          </p>

          <div className="max-w-3xl mx-auto space-y-6 mb-10">
            {t.primarySymptoms.map((sym, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#003366] text-white font-bold text-base flex-shrink-0">{sym.num}</span>
                <div>
                  {sym.lines.map((line, j) => (
                    <p key={j} className="text-xl">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#D7EDF6] rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center flex-shrink-0">
                <img
                  src="/images/d8c9c41a322726df07f26884b2acc310.png"
                  alt="გაითვალისწინეთ"
                  className="w-[280px] h-[280px] object-contain"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-4xl font-bold text-[#003366] mb-4">{t.noteTitle}</p>
                <p className="text-xl leading-relaxed">{t.noteText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-2 px-4 text-center">
        <p className="text-4xl font-bold text-[#003366] tracking-widest py-4">
          {t.mainSymptomsTitle}
        </p>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2 space-y-4">
            {t.mainSymptoms.map((symptom, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">✔️</span>
                <span className="text-xl">{symptom}</span>
              </div>
            ))}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/retiniti3.jpg"
              alt="პიგმენტური რეტინიტი სიმპტომები"
              className="w-full max-w-[500px] h-[220px] object-cover rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-4xl font-bold text-[#003366] text-center mb-8">
            {t.whyDecreaseTitle}
          </p>
          <div>
            <p className="text-xl leading-relaxed mb-4">
              <img
                src="/images/badura.jpg"
                alt="ბადურა"
                className="float-right ml-6 mb-4 h-[380px] w-auto max-w-[420px] object-cover rounded"
              />
              {t.whyText1}
            </p>
            <p className="text-xl leading-relaxed mb-4">{t.whyText2}</p>
            <p className="text-xl leading-relaxed">{t.whyText3}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 flex justify-center flex-shrink-0">
            <img
              src="/images/img1.jpg"
              alt="მაგოთერაპია"
              className="w-full max-w-[500px] h-[320px] object-cover rounded"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-4xl font-bold mb-6">{t.magotherapyTreatTitle}</p>
            <p className="text-2xl leading-relaxed">{t.magotherapyTreatText}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl font-bold text-center mb-6">{t.treatWithUs}</p>
          <p className="text-xl leading-relaxed mb-4">{t.treatmentPrognosis}</p>
          <p className="text-xl text-right">
            <strong>
              <Link to="/magotherapy" className="text-[#003366] hover:underline">
                {t.seeMoreMago}
              </Link>
            </strong>
          </p>
        </div>
      </div>

      <div className="py-6 flex justify-center">
        <ChevronDown className="w-20 h-20 text-[#003366]" strokeWidth={2} />
      </div>

      <div className="bg-[#D7EDF6] py-4 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366] py-3">{t.howVisionRestoredTitle}</p>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2 space-y-4">
            <p className="text-xl leading-relaxed">{t.howText1}</p>
            <p className="text-xl leading-relaxed">{t.howText2}</p>
            <p className="text-xl leading-relaxed">{t.howText3}</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/videodan.jpg"
              alt="მაგოთერაპია პროცედურა"
              className="w-full max-w-[550px] h-[420px] object-cover rounded"
            />
          </div>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.successRateText}</p>
        <p className="text-3xl font-bold text-[#003366] mt-2">{t.successRateText2}</p>
        <p className="text-3xl font-bold text-[#003366] mt-2">{t.successRateText3}</p>
      </div>

      <div className="bg-[#00265E] text-white py-8 px-4 text-center">
        <p className="text-4xl font-bold">{t.resultsTitle}</p>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.results.map((result, i) => (
              <div key={i}>
                <p className="text-2xl font-bold mb-2 text-[#003366]">{result.title}</p>
                <p className="text-lg leading-relaxed">{result.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#003366] text-center mb-8">
            {t.patientVideosTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { id: 'P2MaWhAK14s', title: 'patient-video-1' },
              { id: 'O1y_DNsjFq4', title: 'patient-video-2' },
              { id: '_aoaJA_TxZk', title: 'patient-video-3' },
            ].map(({ id, title }) => (
              <div key={id} className="aspect-video">
                <iframe
                  className="w-full h-full rounded shadow"
                  src={`https://www.youtube.com/embed/${id}`}
                  frameBorder="0"
                  allowFullScreen
                  title={title}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a
              href="https://www.youtube.com/@magotherapy/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#00265E] text-white font-bold rounded-lg hover:bg-[#003a8c] transition"
            >
              {t.moreVideosYoutube}
            </a>
          </div>
        </div>
      </div>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}
