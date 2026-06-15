import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useAboutTranslations } from '../translations/about';
import FloatingButtons from '../components/FloatingButtons';

function TimelineSection({ title, items }: { title: string; items: { year: string; text: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#00265E] text-white font-bold text-lg hover:bg-[#003580] transition"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && (
        <div className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4 px-6 py-4">
              <div className="flex-shrink-0 w-16 text-center">
                <span className="inline-block border-t-4 border-[#00265E] pt-2 text-[#00265E] font-bold text-base">
                  {item.year}
                </span>
              </div>
              <p className="text-gray-800 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function parseCvText(text: string): { year: string; text: string }[] {
  return text
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return { year: '', text: line };
      return { year: line.slice(0, colonIdx).trim(), text: line.slice(colonIdx + 1).trim() };
    });
}

export default function AboutPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useAboutTranslations(language);
  const p = 'about';
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

      <div className="bg-[#00265E] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            {t.clinicTitle}
          </h1>
          <p className="text-2xl md:text-3xl font-bold tracking-widest">
            {t.magoTherapy}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white/90"
            dangerouslySetInnerHTML={{ __html: t.aboutUs }}
          />
          <div className="border border-white/30 rounded-xl p-6 text-left max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              {t.heroText}
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 text-center">
        <p className="text-2xl md:text-3xl font-bold text-[#00265E]">
          {t.sinceText}
        </p>
      </div>

      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00265E] text-center mb-8">
            {t.clinicSectionTitle}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <img
                src="/newpage/about/patent.jpg"
                alt={t.patentAlt}
                className="w-full rounded-xl shadow-lg object-cover max-h-72"
              />
            </div>
            <div className="md:w-1/2 text-lg text-gray-800 leading-relaxed">
              <p>{t.clinicDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#00265E] text-white py-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest"
          dangerouslySetInnerHTML={{ __html: t.aboutUsBanner }}
        />
      </div>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-lg text-gray-800 mb-10">
            {t.tbilisiClinicIntro}
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-start mb-10">
            <div className="lg:w-1/3 flex-shrink-0">
              <img
                src="/newpage/about/fio.jpg"
                alt="Maka Gogiashvili"
                className="w-full rounded-xl shadow-lg object-cover max-h-[450px]"
              />
            </div>
            <div className="lg:w-2/3 text-lg text-gray-800 leading-relaxed space-y-4">
              <p>{t.bioIntro}</p>
              <p>{t.bio2}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-3/4 text-lg text-gray-800 leading-relaxed space-y-4">
              <p>{t.methodText}</p>
              <p>{t.treatmentAlsoFor}</p>
              <ul className="space-y-1 ml-4">
                {t.diseaseList.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00265E] flex-shrink-0" />
                    <a href={item.to} className="text-[#00265E] hover:underline font-medium">
                      {item.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/4 flex-shrink-0">
              <img
                src="/newpage/about/avtori.jpg"
                alt="Author"
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00265E] text-center mb-4 tracking-wide"
            dangerouslySetInnerHTML={{ __html: t.advantagesTitle }}
          />
          <div className="flex flex-col items-center gap-2 mb-10">
            <img
              src="/images/small_logo.png"
              alt="MaGo Clinic"
              className="h-12 w-auto max-w-xs"
            />
            <p className="text-xl font-bold text-[#00265E] text-center">
              {t.experience}
              <br />
              <span className="text-gray-700 font-normal text-lg">
                {t.patientsCount}
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.advantages.map((adv) => (
              <div key={adv.num} className="flex gap-4 bg-gray-50 rounded-xl p-5 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00265E] text-white flex items-center justify-center font-bold text-lg">
                  {adv.num}
                </div>
                <div>
                  <h4 className="font-bold text-[#00265E] mb-2">{adv.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{adv.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xl font-bold text-[#00265E] mt-10">
            {t.qualityImprove}
          </p>
        </div>
      </section>

      <div className="bg-[#00265E] text-white py-6 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: t.statsTitle }}
        />
      </div>

      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border-2 border-[#00265E] rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {t.stats.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="px-6 py-3 text-gray-800">{row.label}</td>
                    <td className="px-6 py-3 font-bold text-[#00265E] text-right whitespace-nowrap">
                      {row.value}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="bg-[#00265E] text-white py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-2xl font-bold">{t.repeatCourse1}</p>
          <p className="text-2xl font-bold">{t.repeatCourse2}</p>
          <p className="text-2xl font-bold">{t.repeatCourse3}</p>
          <p className="text-2xl font-bold">{t.repeatCourse4}</p>
          <p className="text-2xl font-bold">{t.repeatCourse5}</p>
          <p className="text-2xl font-bold">{t.repeatCourse6}</p>
        </div>
      </div>

      <section className="py-10 bg-[#F3F5F5]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00265E] mb-8">{t.researchText}</h2>

          <h2 className="text-2xl md:text-3xl font-bold text-[#00265E] mb-6">
            {t.howVisionRestored}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-3/5 text-lg text-[#00265E] leading-relaxed">
              <p>{t.howText}</p>
              <p className="mt-4">
                <Link to="/magotherapy" className="text-[#00265E] font-bold hover:underline">
                  {t.seeMoreMago}
                </Link>
              </p>
            </div>
            <div className="lg:w-2/5 flex-shrink-0">
              <img
                src="/newpage/about/Cerebro.jpg"
                alt="Neural system"
                className="w-full rounded-xl shadow-lg object-cover max-h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00265E] text-center mb-10 tracking-wide"
            dangerouslySetInnerHTML={{ __html: t.authorTitle }}
          />

          <TimelineSection title={t.academicQual} items={parseCvText(t.academicCvText)} />
          <TimelineSection title={t.publicActivity} items={parseCvText(t.publicActivityText)} />
          <TimelineSection title={t.publications} items={parseCvText(t.publicationsText)} />
          <TimelineSection title={t.awards} items={parseCvText(t.awardsText)} />
        </div>
      </section>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}
