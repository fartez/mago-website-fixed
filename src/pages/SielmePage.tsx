import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useSielmeTranslations } from '../translations/sielme';
import FloatingButtons from '../components/FloatingButtons';

export default function SielmePage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useSielmeTranslations(language);
  const p = 'sielme';
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
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg">
            {t.pageTitle}
          </h1>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-8 md:hidden">
            {t.pageTitle}
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src="/images/ojaxi.jpg"
                alt="სიელმე - ოჯახი"
                className="w-full max-w-[500px] h-auto object-cover rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-3">
              <p className="text-2xl font-bold">{t.heroText1}</p>
              <p className="text-xl font-bold">{t.heroText2}</p>
              <p className="text-xl font-bold">{t.heroText3}</p>
              <p className="text-xl font-bold">{t.heroText4}</p>
              <p className="text-xl font-bold">{t.heroText5}</p>
              <p className="text-xl font-bold text-center mt-4">{t.heroText6}</p>
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
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-2/3">
              <p className="text-xl leading-relaxed">
                <strong>{t.definitionTitle}</strong> {t.definition}
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/images/sielme-ka.png"
                alt="სიელმე დიაგრამა"
                className="h-[350px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366] mb-6">{t.notCosmeticTitle}</p>
        <div className="flex justify-center mb-6">
          <ChevronDown className="w-16 h-16 text-[#003366]" strokeWidth={2} />
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">✔️</span>
                <strong className="text-lg">{t.symptom1}</strong>
                <span className="mx-6" />
                <span className="text-xl">✔️</span>
                <strong className="text-lg">{t.symptom2}</strong>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">✔️</span>
                <strong className="text-lg">{t.symptom3}</strong>
                <span className="mx-6" />
                <span className="text-xl">✔️</span>
                <strong className="text-lg">{t.symptom4}</strong>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">✔️</span>
                <strong className="text-lg">{t.symptom5}</strong>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/images/gaoreba.jpg"
                alt="გაორება"
                className="w-full max-w-[320px] h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.whenTitle}</p>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src="/images/unnamed.jpg"
                alt="ბავშვი"
                className="w-full max-w-[370px] h-auto object-cover rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-xl leading-relaxed">{t.whenText1}</p>
              <p className="text-xl leading-relaxed">{t.whenText2}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-xl text-center leading-relaxed">{t.whenText3}</p>
            <p className="text-xl text-center leading-relaxed">{t.whenText4}</p>
            <p className="text-xl text-center font-bold leading-relaxed">{t.whenText5}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-10 px-4 text-center">
        <p className="text-3xl font-bold mb-4">{t.dontDelay1}</p>
        <p className="text-3xl font-bold">{t.dontDelay2}</p>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl font-bold text-center mb-4">{t.earlyTreatment}</p>
          <p className="text-xl leading-relaxed mt-4">{t.earlyText}</p>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.whyTitle}</p>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg leading-relaxed">{t.whyText1}</p>
              <p className="text-lg leading-relaxed">
                {t.whyText2}
              </p>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <img
                src="/images/sielme2.jpg"
                alt="სიელმე 2"
                className="w-full max-w-[400px] h-auto object-cover rounded"
              />
            </div>
          </div>

          <div className="flex justify-center my-6">
            <ChevronDown className="w-16 h-16 text-[#003366]" strokeWidth={2} />
          </div>

          <p className="text-2xl font-bold text-center text-[#003366]">{t.withoutFunction}</p>
          <p className="text-2xl font-bold text-center text-[#003366] mb-6">{t.organAtrophies}</p>

          <div className="bg-white rounded p-4 mb-6">
            <p className="text-lg font-bold leading-relaxed">{t.lazyEyeText}</p>
          </div>

          <div className="flex justify-center my-6">
            <ChevronDown className="w-16 h-16 text-[#003366]" strokeWidth={2} />
          </div>

          <p className="text-2xl font-bold text-center text-[#003366] mb-6">{t.fusionDamaged}</p>

          <div className="space-y-4">
            <p className="text-lg font-bold leading-relaxed">{t.fusionText1}</p>
            <p className="text-lg font-bold leading-relaxed">{t.fusionText2}</p>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.commonTreatmentTitle}</p>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg leading-relaxed">{t.commonText1}</p>
              <p className="text-lg leading-relaxed">{t.commonText2}</p>
              <p className="text-lg leading-relaxed">{t.commonText3}</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/operaciq.jpg"
                alt="ოპერაცია"
                className="w-full max-w-[480px] h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-3xl font-bold leading-relaxed">
            {t.medicineEvolvesTitle1}
            <br />
            {t.medicineEvolvesTitle2}
          </p>
          <p className="text-3xl font-bold leading-relaxed">
            {t.medicineEvolvesText1}
            <br />
            {t.medicineEvolvesText2}
            <br />
            {t.medicineEvolvesText3}
          </p>
          <hr className="border-white/40 my-6" />
          <p className="text-3xl font-bold">{t.magotherapy}</p>
          <p className="text-2xl font-bold text-center leading-relaxed">{t.since1996}</p>
          <hr className="border-white/40 my-4" />
          <p className="text-2xl font-bold text-center">{t.stableResult}</p>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.howWeCorrectTitle}</p>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="text-xl font-bold leading-relaxed">{t.howText1}</p>
          <p className="text-xl font-bold leading-relaxed">{t.howText2}</p>
          <p className="text-xl font-bold leading-relaxed">{t.howText3}</p>
        </div>
      </div>

      <div className="py-8 px-4">
        <div className="flex justify-center mb-8">
          <ChevronDown className="w-16 h-16 text-[#003366]" strokeWidth={2} />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.positiveChanges.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-base mt-0.5">✔️</span>
                <span className="text-base">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-lg mt-6 leading-relaxed">{t.positiveChangesText}</p>
        </div>
      </div>

      <div className="py-8 px-4 text-center">
        <p className="text-3xl font-bold text-[#003366]">{t.resultsTitle}</p>
        <div className="flex justify-center my-4">
          <ChevronDown className="w-16 h-16 text-[#003366]" strokeWidth={2} />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 text-left">
            {t.results.map((result, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00265E] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <span className="font-bold text-xl leading-snug pt-1.5">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-lg font-bold leading-relaxed">{t.resultsText}</p>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-3xl font-bold text-[#003366] mb-6">{t.adviceTitle}</p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg leading-relaxed">{t.adviceText1}</p>
              <p className="text-lg leading-relaxed">{t.adviceText2}</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/chvili.jpg"
                alt="ჩვილი"
                className="w-full max-w-[330px] h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <img
                src="/images/d8c9c41a322726df07f26884b2acc310.png"
                alt="სიელმე სტატისტიკა"
                className="w-[300px] h-auto object-contain"
              />
            </div>
            <div className="space-y-4">
              <p className="text-xl leading-relaxed">{t.noticeText1}</p>
              <p className="text-xl leading-relaxed">{t.noticeText2}</p>
              <p className="text-xl leading-relaxed">{t.noticeText3}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-center mt-6">{t.earlyDetection}</p>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#003366] text-center mb-10">
            {t.patientVideosTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'R4lKHSBDK2o',
              'CMnloViBiN4',
              'TbVzKUz2V-w',
              'xBo7gHdQxhE',
              'cUBmhbOkczg',
              'cy13ln--Ts4',
              'TKQ9gaSNbeI',
              '0NH2s9tW78A',
              'DWGdUi_oC4I',
            ].map((id) => (
              <div key={id} className="aspect-video w-full">
                <iframe
                  className="w-full h-full rounded shadow"
                  src={`https://www.youtube.com/embed/${id}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`video-${id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}
