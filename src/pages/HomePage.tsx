import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import YouTubeBanner from '../components/YouTubeBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useHomeTranslations } from '../translations/home';
import FloatingButtons from '../components/FloatingButtons';

export default function HomePage() {
  const { language, getSiteContent } = useLanguage();
  const raw = useHomeTranslations(language);
  const p = 'home';
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

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h2 className="text-4xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              {t.appointmentOnly}
            </h2>
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-[#00265E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-6 items-center max-w-6xl mx-auto">
            <div className="text-right">
              <p className="text-base font-bold leading-snug">
                {t.personalizedTreatment}
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
                {t.noSurgery}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden relative h-[250px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/neurofinal.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 px-4 h-full flex items-center">
          <div className="text-white">
            <h2 className="text-2xl font-extrabold leading-tight mb-3 drop-shadow-lg">
              {t.appointmentOnly}
            </h2>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-[#00265E] text-white px-4 py-6">
        <div className="max-w-lg mx-auto">
          <p className="text-center text-base font-bold mb-3">
            <strong>{t.clinicAndTreatment}</strong><br />
            {t.visionRestoration}
          </p>
          <div className="aspect-video rounded-lg overflow-hidden mb-3">
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
          <p className="text-center text-base font-bold">
            {t.nonSurgicalTbilisi}
          </p>
        </div>
      </div>

      <div className="hidden md:block bg-[#00265E] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-3">{t.heroTitle}</h1>
            <p className="text-lg opacity-95">{t.heroSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center justify-center">
              <img
                src="/images/agidginet_mx(1).jpg"
                alt="Magotherapy"
                className="rounded-2xl shadow-2xl w-full max-h-[400px] object-cover object-center"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h2 className="text-2xl font-extrabold mb-4">{t.naturalMethod}</h2>
              <div className="text-lg leading-relaxed space-y-2">
                <p><strong>{t.withApparatus}</strong></p>
                <p><strong>{t.noSurgeryFull}</strong></p>
                <p><strong>{t.evenForIncurable}</strong></p>
                <p className="mb-4"><strong>{t.thatCantBeCured}</strong></p>
                <p className="opacity-95"><strong>{t.patentedText}</strong></p>
              </div>

              <div className="mt-6 flex gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-[#00265E] px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-gray-100 transition"
                >
                  {t.consultation}
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white/85 text-white px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-white/10 transition"
                >
                  {t.contactBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-[#00265E] text-white px-4 py-6">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-extrabold mb-3">{t.heroTitle}</h1>
          <p className="text-base leading-relaxed opacity-95 mb-4">{t.heroSubtitle}</p>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left mb-4">
            <h2 className="text-xl font-extrabold mb-3">{t.naturalMethod}</h2>
            <div className="text-base leading-relaxed space-y-2">
              <p>{t.mobilePoint1}</p>
              <p>{t.mobilePoint2}</p>
              <p>{t.mobilePoint3}</p>
              <p>{t.mobilePoint4}</p>
            </div>
          </div>

          <Link
            to="/contact"
            className="block w-full bg-white text-[#00265E] px-6 py-3 rounded-xl font-extrabold text-lg mb-3 hover:bg-gray-100 transition text-center"
          >
            {t.consultation}
          </Link>
          <Link
            to="/contact"
            className="block w-full bg-transparent border-2 border-white/85 text-white px-6 py-3 rounded-xl font-extrabold text-lg hover:bg-white/10 transition text-center"
          >
            {t.contactBtn}
          </Link>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] text-center mb-6">
            {t.patientsCount}
          </h2>

          <div className="hidden md:grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <FeatureCard icon="🚫" text={t.feature1} />
            <FeatureCard icon="👥" text={t.feature2} />
            <FeatureCard icon="✅" text={t.feature3} />
            <FeatureCard icon="⚡" text={t.feature4} />
            <FeatureCard icon="⏱️" text={t.feature5} />
            <FeatureCard icon="🏆" text={t.feature6} />
            <FeatureCard icon="🎯" text={t.feature7} />
            <FeatureCard icon="🔄" text={t.feature8} />
          </div>

          <div className="md:hidden space-y-3 max-w-lg mx-auto">
            <FeatureCard icon="🚫" text={t.feature1} />
            <FeatureCard icon="⚡" text={t.feature4} />
            <FeatureCard icon="👥" text={t.feature2mobile} />
            <FeatureCard icon="⏱️" text={t.feature5} />
            <FeatureCard icon="✅" text={t.feature3} />
            <FeatureCard icon="🏆" text={t.feature6} />
            <FeatureCard icon="🎯" text={t.feature7} />
            <FeatureCard icon="🔄" text={t.feature8} />
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-4">
        <h2 className="text-2xl font-black px-4">
          {t.tagline}
        </h2>
      </div>

      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-6">
            <div className="text-lg leading-relaxed text-black space-y-4">
              <p>
                <strong>{t.magoTherapyTitle}</strong> — {t.intro1}
              </p>
              <p>{t.intro2}</p>
              <p>{t.intro3}</p>
              <p>{t.intro4}</p>
            </div>

            <div className="text-right mt-6">
              <Link to="/magotherapy" className="inline-block bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg font-black hover:bg-gray-50 transition">
                {t.seeMore}
              </Link>
            </div>
          </div>

          <div className="max-w-lg mx-auto mt-6 space-y-3">
            <ChecklistItem text={t.check1} />
            <ChecklistItem text={t.check2} />
            <ChecklistItem text={t.check3} />
            <ChecklistItem text={t.check4} />
            <ChecklistItem text={t.check5} />
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="hidden md:block">
              <img
                src="/images/avtori.jpg"
                alt="Doctor Maka Gogiashvili"
                className="rounded-2xl shadow-2xl w-full max-w-sm"
              />
            </div>

            <div>
              <p className="text-sm font-medium opacity-40 mb-2 tracking-wide">{t.doctorSubtitle}</p>
              <h2 className="text-2xl font-black mb-3">{t.doctorName}</h2>
              <p className="text-base leading-relaxed opacity-95">
                {t.doctorDesc1}
              </p>
              <p className="text-base leading-relaxed opacity-95 mt-3">
                {t.doctorDesc2}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-black text-[#003366] text-center mb-6">{t.magoTitle}</h2>

          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🔬</div>
              <p className="text-base"><strong>{t.magoCard1Title}</strong> — {t.magoCard1}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <p className="text-base"><strong>{t.magoCard2Title}</strong> — {t.magoCard2}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <p className="text-base"><strong>{t.magoCard3Title}</strong> — {t.magoCard3}</p>
            </div>
          </div>

          <div className="md:hidden space-y-4 max-w-lg mx-auto">
            <MagoCard icon="🔬" title={t.magoCard1Title} text={t.magoCard1Full} />
            <MagoCard icon="⚡" title={t.magoCard2Title} text={t.magoCard2Full} />
            <MagoCard icon="🛡️" title={t.magoCard3Title} text={t.magoCard3Full} />
          </div>

          <p className="text-center text-lg font-black text-[#003366] mt-8">
            {t.magoFootnote}
          </p>
        </div>
      </div>

      <div className="hidden md:block py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
            <DiseaseCard name={t.diseaseAmblyopia} color="bg-blue-100" />
            <DiseaseCard name={t.diseasePigmentary} color="bg-blue-100" />
            <DiseaseCard name={t.diseaseSielme} color="bg-green-100" />
            <DiseaseCard name={t.diseaseAstigmatizm} color="bg-yellow-100" />
            <DiseaseCard name={t.diseaseGlaukoma} color="bg-red-100" />
          </div>
        </div>
      </div>

      <div className="md:hidden py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <DiseaseCard name={t.diseaseAmblyopia} color="bg-blue-100" />
            <DiseaseCard name={t.diseasePigmentary} color="bg-blue-100" />
            <DiseaseCard name={t.diseaseSielme} color="bg-green-100" />
            <DiseaseCard name={t.diseaseAstigmatizm} color="bg-yellow-100" />
          </div>
          <div className="mt-4 flex justify-center">
            <DiseaseCard name={t.diseaseGlaukoma} color="bg-red-100" />
          </div>
        </div>
      </div>

      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-black text-[#003366] text-center mb-6">
            {t.clinicSectionTitle}
          </h2>

          <div className="bg-white rounded-2xl p-6">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-96">
              <img
                src="/images/mozg.jpg"
                alt="Clinic"
                className="rounded-xl w-full"
              />
            </div>

            <div className="text-base leading-relaxed text-black space-y-4">
              <p>{t.clinic1}</p>
              <p>{t.clinic2}</p>
            </div>

            <div style={{ clear: 'both' }}></div>

            <div className="text-right mt-6">
              <Link to="/magotherapy" className="inline-block bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg font-black hover:bg-gray-50 transition">
                {t.seeMoreClinic}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00265E] text-white text-center py-6">
        <h2 className="text-3xl font-black mb-2 px-4">{t.resultQuestion1}</h2>
        <h2 className="text-3xl font-black px-4">{t.resultQuestion2}</h2>
      </div>

      <div className="bg-[#D7EDF6] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-6">
            <div className="md:float-right md:ml-6 mb-4 md:mb-0 md:w-80 hidden md:block">
              <img
                src="/images/phototvali(1)_(1).jpg"
                alt="Eye Treatment"
                className="rounded-xl w-full"
              />
            </div>

            <div className="text-base leading-relaxed text-black space-y-4">
              <p>{t.result1}</p>
              <p>{t.result2}</p>
              <p>{t.result3}</p>
            </div>

            <div style={{ clear: 'both' }}></div>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block bg-[#00265E] text-white px-6 py-3 rounded-xl font-black text-lg hover:bg-[#003366] transition"
              >
                {t.contactToday}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <YouTubeBanner />
      <Footer />

    </div>
  );
}

function FeatureCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-start gap-3">
      <div className="text-3xl flex-shrink-0">{icon}</div>
      <p className="text-base font-extrabold text-[#003366] leading-tight">{text}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-green-600 text-2xl flex-shrink-0">✓</div>
      <p className="text-base">{text}</p>
    </div>
  );
}

function MagoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{icon}</div>
        <h3 className="font-black text-[#003366]">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function DiseaseCard({ name, color }: { name: string; color: string }) {
  return (
    <div className={`${color} rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer`}>
      <div className="text-3xl mb-2">👁️</div>
      <p className="font-bold text-sm">{name}</p>
    </div>
  );
}
