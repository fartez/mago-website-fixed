import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { magotherapyTranslations } from '../translations/magotherapy';
import FloatingButtons from '../components/FloatingButtons';

export default function MagotherapyPage() {
  const { language, getSiteContent } = useLanguage();
  const raw = magotherapyTranslations[language];
  const p = 'magotherapy';
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-6 items-center max-w-6xl mx-auto">
            <div className="text-right">
              <p className="text-base font-bold leading-snug">
                {t.videoTitle1}
              </p>
            </div>
            <div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${language === 'ru' ? 'fZVhSNEFDFc' : 'aZ9hcOnSCnM'}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="text-left">
              <p className="text-base font-bold leading-snug">
                {t.videoTitle2}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-12 px-4">
        <h1 className="text-5xl font-bold mb-6">{t.pageTitle}</h1>
        <h2 className="text-3xl font-bold mb-8 whitespace-pre-line">
          {t.mainSubheading}
        </h2>
        <p className="text-xl font-bold">
          {t.clinicallyTested}
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-[#000080] text-center mb-12">
          {t.whatIsMagotherapy}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <img src="/images/mmm.jpg" alt="Vedensky" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="text-lg leading-relaxed">
            <p>{t.vedenskyText}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="text-lg leading-relaxed">
            <p className="font-bold mb-4 whitespace-pre-line">
              {t.vedenskyText2}
            </p>
          </div>
          <div>
            <img src="/images/bednieri_bichi.png" alt="Happy child" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#000080] text-center mb-10">
            {t.parabiozi}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-xl leading-relaxed whitespace-pre-line text-gray-800">
              {t.parabioziText}
            </div>
            <div>
              <img
                src="/images/Parabiozi.jpeg"
                alt="პარაბიოზი - კლინიკური სიკვდილი"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#000080] text-center mb-12">
            {t.whyPoorVision}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <img src="/images/ratom.jpg" alt="Why poor vision" className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="text-xl leading-relaxed">
              <p>{t.whyPoorVisionText}</p>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-[#003366] text-center mb-10">{t.whyPoorVisionImportantHeading}</h3>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#003366] flex items-center justify-center text-2xl font-bold text-[#003366] mb-4">1</div>
              <p className="text-lg">{t.important1}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#003366] flex items-center justify-center text-2xl font-bold text-[#003366] mb-4">2</div>
              <p className="text-lg">{t.important2}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#003366] flex items-center justify-center text-2xl font-bold text-[#003366] mb-4">3</div>
              <p className="text-lg">{t.important3}</p>
            </div>
          </div>

          <p className="text-xl leading-relaxed max-w-4xl mx-auto text-center">{t.whyPoorVisionClosing}</p>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#000080] text-center mb-12">
            {t.whatIsNerveImpulse}
          </h2>

          <p className="text-xl text-center max-w-4xl mx-auto mb-12 whitespace-pre-line">
            {t.nerveImpulseText}
          </p>

          <div className="bg-white rounded-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img src="/images/NEIRONI2.jpg" alt="Neuron" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="text-lg leading-relaxed whitespace-pre-line">
                <p>{t.neuronComparison1}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
              <div className="text-lg leading-relaxed whitespace-pre-line">
                <p>{t.neuronComparison2}</p>
              </div>
              <div>
                <img src="/images/2057765d2f062d8(1).jpg" alt="Tree and neuron" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-[#000080] text-center mb-12">
          {t.howNerveImpulseFormed}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src="/images/ujredi.jpg" alt="Cell" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="text-xl text-center leading-relaxed whitespace-pre-line">
            <p>{t.nerveImpulseFormationText}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0C2857] text-white py-12 px-4">
        <div className="container mx-auto">
          <p className="text-2xl font-bold whitespace-pre-line">
            {t.synchronousActivity}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-[#000080] text-center mb-12">
          {t.whyVisionRestoresInHour}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="flex justify-center">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl" style={{ maxWidth: '320px', width: '100%' }}>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none z-10" />
              <img
                src="/images/orig.gif"
                alt="Fedorov"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                style={{ display: 'block' }}
              />
            </div>
          </div>
          <div className="text-lg leading-relaxed whitespace-pre-line space-y-4">
            {t.fedorovTribute.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>
                {paragraph.split(/(?=სვიატოსლავ ფიოდოროვს|ნატალია ბეხტერევას|Svyatoslav Fyodorov|Natalia Bekhtereva|Святославу Фёдорову|Наталии Бехтеревой)/).map((part, i) =>
                  part.startsWith('სვიატოსლავ ფიოდოროვს') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">სვიატოსლავ ფიოდოროვს</span>
                      {part.substring('სვიატოსლავ ფიოდოროვს'.length)}
                    </span>
                  ) : part.startsWith('ნატალია ბეხტერევას') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">ნატალია ბეხტერევას</span>
                      {part.substring('ნატალია ბეხტერევას'.length)}
                    </span>
                  ) : part.startsWith('Svyatoslav Fyodorov') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">Svyatoslav Fyodorov</span>
                      {part.substring('Svyatoslav Fyodorov'.length)}
                    </span>
                  ) : part.startsWith('Natalia Bekhtereva') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">Natalia Bekhtereva</span>
                      {part.substring('Natalia Bekhtereva'.length)}
                    </span>
                  ) : part.startsWith('Святославу Фёдорову') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">Святославу Фёдорову</span>
                      {part.substring('Святославу Фёдорову'.length)}
                    </span>
                  ) : part.startsWith('Наталии Бехтеревой') ? (
                    <span key={i}>
                      <span className="font-bold text-[#003366]">Наталии Бехтеревой</span>
                      {part.substring('Наталии Бехтеревой'.length)}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </div>

        <h2 className="text-4xl font-bold text-[#002A72] text-center mb-12">
          {t.mechanismOfRecovery}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          <div className="text-lg leading-relaxed whitespace-pre-line">
            <p>{t.mechanismText}</p>
          </div>
          <div>
            <img src="/images/app.jpg" alt="Equipment" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>

        <p className="text-xl font-bold text-[#00265E] text-center mb-6">{t.biochemicalSubheading}</p>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-[#003366] flex items-center justify-center text-xl font-bold text-[#003366]">1</div>
              <p className="text-lg">{t.biochemicalChange1}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-[#003366] flex items-center justify-center text-xl font-bold text-[#003366]">2</div>
              <p className="text-lg">{t.biochemicalChange2}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-[#003366] flex items-center justify-center text-xl font-bold text-[#003366]">3</div>
              <p className="text-lg">{t.biochemicalChange3}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-[#003366] flex items-center justify-center text-xl font-bold text-[#003366]">4</div>
              <p className="text-lg">{t.biochemicalChange4}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-4 border-[#003366] flex items-center justify-center text-xl font-bold text-[#003366]">5</div>
              <p className="text-lg">{t.biochemicalChange5}</p>
            </div>
          </div>
        </div>

        <h3 className="text-4xl font-bold text-[#003366] text-center mb-12">
          {t.positiveChangesResult}
        </h3>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step1}</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="bg-blue-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step2}</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="bg-blue-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step3}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-blue-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step4}</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="bg-blue-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step5}</p>
            </div>
            <div className="text-4xl">=</div>
            <div className="bg-green-100 p-6 rounded-lg text-center flex-1">
              <p className="font-bold">{t.step6}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <img src="/images/sqema.png" alt="Schema" className="mx-auto max-w-full rounded-lg shadow-lg" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-3xl font-bold text-[#003366] whitespace-pre-line">
            <p>{t.secretText}</p>
          </div>
          <div>
            <img src="/images/flowblur.jpg" alt="Result" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-6">
          {t.howRealisticToTreat}
        </h2>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-[#003366] text-center mb-12">
          {t.treatPatientNotDisease}
        </h2>

        <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6 mb-12 whitespace-pre-line">
          <p>{t.treatPatientText}</p>
        </div>

        <h2 className="text-4xl font-bold text-[#003366] text-center mb-12">
          {t.lightningFlashes}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <img src="/images/Синие-молнии.jpg" alt="Lightning" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="text-lg leading-relaxed whitespace-pre-line">
            <p>{t.lightningText}</p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-[#003366] text-center mb-12">
          {t.successStatistics}
        </h2>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white border-4 border-[#00265E] rounded-lg p-8">
            <table className="w-full">
              <tbody className="divide-y divide-gray-300">
                <tr>
                  <td className="py-3 text-lg">{t.statistics1}</td>
                  <td className="py-3 text-lg font-bold text-right">98 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics2}</td>
                  <td className="py-3 text-lg font-bold text-right">98 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics3}</td>
                  <td className="py-3 text-lg font-bold text-right">97 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics4}</td>
                  <td className="py-3 text-lg font-bold text-right">90 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics5}</td>
                  <td className="py-3 text-lg font-bold text-right">89 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics6}</td>
                  <td className="py-3 text-lg font-bold text-right">88 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics7}</td>
                  <td className="py-3 text-lg font-bold text-right">87 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics8}</td>
                  <td className="py-3 text-lg font-bold text-right">80 %</td>
                </tr>
                <tr>
                  <td className="py-3 text-lg">{t.statistics9}</td>
                  <td className="py-3 text-lg font-bold text-right">70 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#00265E] text-white text-center py-8 px-4 rounded-lg mb-12">
          <p className="text-2xl font-bold whitespace-pre-line">
            {t.repeatCourses}
          </p>
        </div>

        <h2 className="text-4xl font-bold text-[#003366] text-center mb-12">
          {t.contraindications}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <img src="/images/ukuchveneba.jpg" alt="Contraindications" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="text-xl">
            <ul className="space-y-4">
              <li>{t.contraindication1}</li>
              <li>{t.contraindication2}</li>
              <li>{t.contraindication3}</li>
              <li>{t.contraindication4}</li>
              <li>{t.contraindication5}</li>
            </ul>
          </div>
        </div>

        <div className="text-center py-12 border-t-4 border-[#0C2857]">
          <h3 className="text-5xl font-bold text-[#0C2857] mb-8">{t.sideEffects}</h3>
          <h3 className="text-5xl font-bold text-[#0C2857] mb-8">{t.risk}</h3>
          <h3 className="text-5xl font-bold text-[#0C2857] mb-8">{t.complications}</h3>
          <h3 className="text-5xl font-bold text-[#0C2857] mb-12">{t.allergies}</h3>

          <div className="flex items-center justify-center gap-8">
            <h2 className="text-5xl font-bold text-[#003366]">{t.excluded}</h2>
            <img src="/images/gartuleba.jpg" alt="Excluded" className="w-96 rounded-lg shadow-2xl" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-[#003366] text-center mb-12 mt-16">
          {t.advantages}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#00265E] rounded-lg p-6 text-white">
            <ul className="space-y-4 text-lg">
              <li>{t.advantage1}</li>
              <li>{t.advantage2}</li>
              <li>{t.advantage3}</li>
              <li>{t.advantage4}</li>
              <li>{t.advantage5}</li>
              <li>{t.advantage6}</li>
            </ul>
          </div>

          <div className="bg-[#00265E] rounded-lg p-6 text-white">
            <ul className="space-y-4 text-lg">
              <li>{t.advantage7}</li>
              <li>{t.advantage8}</li>
              <li>{t.advantage9}</li>
              <li>{t.advantage10}</li>
              <li>{t.advantage11}</li>
              <li>{t.advantage12}</li>
            </ul>
          </div>

          <div className="bg-[#00265E] rounded-lg p-6 text-white">
            <ul className="space-y-4 text-lg">
              <li>{t.advantage13}</li>
              <li>{t.advantage14}</li>
              <li>{t.advantage15}</li>
              <li>{t.advantage16}</li>
              <li>{t.advantage17}</li>
              <li>{t.advantage18}</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-block bg-[#00265E] text-white px-12 py-4 rounded-xl text-2xl font-bold hover:bg-[#003366] transition"
          >
            {t.canYouHelpMe}
          </Link>
        </div>
      </div>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}
