import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useGlaukomaTranslations } from '../translations/glaukoma';
import FloatingButtons from '../components/FloatingButtons';

export default function GlaukomaPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useGlaukomaTranslations(language);
  const p = 'glaukoma';
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
            {t.pageTitle}
          </h1>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-white mb-6 md:hidden">
            {t.pageTitle}
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src="/images/bebo-let-top.jpg"
                alt="გლაუკომა"
                className="w-full max-w-[500px] h-[280px] object-cover rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[#8EC8E8] mb-4">{t.heroHeader}</h2>
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

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 space-y-3">
              <p className="text-xl leading-relaxed">{t.definition1}</p>
              <p className="text-xl font-bold text-[#003366] leading-relaxed">{t.definition2a}</p>
              <p className="text-xl leading-relaxed">{t.definition2b}</p>
              <p className="text-xl leading-relaxed">{t.definition3}</p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src="/newpage/glaucoma/glaukomafoto.jpg"
                alt="Glaucoma illustration"
                className="w-full object-cover rounded"
                style={{ minHeight: '380px', maxHeight: '520px' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#003366] py-14 px-6">
        <p className="text-white text-3xl md:text-4xl font-bold text-center max-w-5xl mx-auto leading-snug">
          {t.magoBannerText}
        </p>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-4xl font-bold text-[#003366] text-center mb-8">
            {t.whyVisionDecreaseTitle}
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/3 space-y-4">
              <p className="text-xl leading-relaxed">{t.whyText1}</p>
              <p className="text-xl leading-relaxed">{t.whyText2}</p>
              <p className="text-xl leading-relaxed">{t.whyText3}</p>
              <p className="text-xl leading-relaxed">{t.whyText4}</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/newpage/glaucoma/Optic_nerve_image_0.jpg"
                alt="მხედველობის ნერვი"
                className="w-full max-w-[350px] h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl font-bold text-[#003366] text-center mb-8 tracking-wide uppercase">
            {t.warningTitle}
          </p>
          <div className="bg-[#00265E] rounded-2xl px-8 py-10 flex flex-col items-center gap-6 shadow-lg">
            <img
              src="/newpage/glaucoma/dzaxili.png"
              alt={t.warningTitle}
              className="w-24 h-24 object-contain"
            />
            <p className="text-white text-2xl md:text-3xl font-bold text-center leading-snug">
              {t.warningText}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-4xl font-bold text-[#003366] text-center mb-8">
            {t.whenDevelopsTitle}
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <img
                src="/newpage/glaucoma/rodis_vitardeba_glaukoma.jpg"
                alt="როდის ვითარდება გლაუკომა"
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-xl leading-relaxed">{t.whenText}</p>
              <div className="space-y-2">
                {t.riskFactors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="text-[#003366] mt-1 min-w-[22px]" size={22} />
                    <p className="text-xl text-[#003366]">{factor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-4xl font-bold text-[#003366] text-center mb-8">
            {t.riskGroupsTitle}
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3 space-y-4">
              <p className="text-xl leading-relaxed">{t.riskGroupsText1}</p>
              <p className="text-xl leading-relaxed">{t.riskGroupsText2}</p>
              <p className="text-xl leading-relaxed">{t.riskGroupsText3}</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/newpage/glaucoma/riski_glaukoma.jpg"
                alt="გლაუკომის რისკ ჯგუფები"
                className="w-full max-w-[350px] h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-2 px-4 text-center">
        <p className="text-4xl font-bold text-[#003366] tracking-widest py-4">
          {t.symptomsTitle}
        </p>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2 space-y-4">
            {t.symptoms.map((symptom, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-xl">{symptom}</span>
              </div>
            ))}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/newpage/glaucoma/mxedvelobis_veli.png"
              alt="გლაუკომა სიმპტომები"
              className="w-full max-w-[500px] h-auto object-contain rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/newpage/glaucoma/daxuruli.jpg"
              alt="დახურული კუთხის გლაუკომა"
              className="w-full max-w-[600px] h-auto object-cover rounded"
            />
          </div>
          <p className="text-3xl font-bold text-[#003366] text-center mb-4">{t.twoFormsTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#003366] mb-3">{t.openAngleTitle}</p>
              <p className="text-xl leading-relaxed">{t.openAngleText}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#003366] mb-3">{t.closedAngleTitle}</p>
              <p className="text-xl leading-relaxed">{t.closedAngleText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-4xl font-bold mb-6">{t.magotherapyTreatmentTitle}</p>
          <p className="text-2xl leading-relaxed text-left">{t.magotherapyText}</p>
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
            {t.results.map((result, i) => {
              const match = result.title.match(/^(\d+)\.\s*(.*)/);
              const num = match ? match[1] : String(i + 1);
              const titleText = match ? match[2] : result.title;
              return (
                <div key={i}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#00265E] text-white flex items-center justify-center text-base font-bold">
                      {num}
                    </span>
                    <p className="text-xl font-bold text-[#00265E] leading-tight pt-1">{titleText}</p>
                  </div>
                  <p className="text-lg leading-relaxed pl-12">{result.text}</p>
                </div>
              );
            })}
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
              { id: 'hVYtwctRXu4', title: 'patient-video-1' },
              { id: 'WJbGqk-X00w', title: 'patient-video-2' },
              { id: 'tY-qf7ASuUg', title: 'patient-video-3' },
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
              href="https://www.youtube.com/@magotherapy"
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
