import { useState, FormEvent } from 'react';
import { Facebook, Youtube, Phone, Clock, Calendar, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactTranslations } from '../translations/contact';
import { useBookingTranslations } from '../translations/booking';
import FloatingButtons from '../components/FloatingButtons';
import { supabase } from '../lib/supabase';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  age: string;
  relationship: string;
  medical_history: string;
}

const emptyForm: FormData = {
  full_name: '',
  email: '',
  phone: '',
  age: '',
  relationship: '',
  medical_history: '',
};

interface LeftContentProps {
  leftP1: string;
  leftP2: string;
  leftP3: string;
  leftP4: string;
  bannerText1: string;
  bannerText2: string;
  leftP5: string;
  leftP6: string;
  leftP7: string;
  leftP8: string;
  clinicBannerTitle: string;
  clinicBannerText: string;
}

function LeftContent({ leftP1, leftP2, leftP3, leftP4, bannerText1, bannerText2, leftP5, leftP6, leftP7, leftP8, clinicBannerTitle, clinicBannerText }: LeftContentProps) {
  return (
    <div className="flex flex-col gap-6 text-gray-800">
      <div className="flex flex-col gap-3">
        <p className="text-base md:text-lg leading-relaxed font-semibold">{leftP1}</p>
        <p className="text-base md:text-lg leading-relaxed">{leftP2}</p>
        <p className="text-base md:text-lg leading-relaxed">{leftP3}</p>
        <p className="text-base md:text-lg leading-relaxed">{leftP4}</p>
      </div>

      <div className="bg-[#00265E] text-white rounded-xl px-6 py-5 shadow-md">
        <p className="text-base md:text-lg leading-relaxed font-semibold">{bannerText1}</p>
        <p className="text-xl md:text-2xl leading-relaxed font-bold mt-6">{bannerText2}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-base md:text-lg leading-relaxed">{leftP5}</p>
        <p className="text-base md:text-lg leading-relaxed">{leftP6}</p>
        <p className="text-base md:text-lg leading-relaxed font-bold bg-[#00265E] text-white rounded-xl px-5 py-3">{leftP7}</p>
        <p className="text-base md:text-lg leading-relaxed">{leftP8}</p>
      </div>

      <div className="bg-[#00265E] text-white rounded-xl px-6 py-5 shadow-md">
        <p className="text-lg md:text-xl leading-relaxed font-bold mb-3">{clinicBannerTitle}</p>
        <p className="text-base md:text-lg leading-relaxed">{clinicBannerText}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { language, getSiteContent } = useLanguage();
  const rawContact = useContactTranslations(language);
  const t = Object.fromEntries(
    Object.entries(rawContact).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent('contact', k, v) : v])
  ) as typeof rawContact;
  const rawBooking = useBookingTranslations(language);
  const tb = Object.fromEntries(
    Object.entries(rawBooking).map(([k, v]) => [k, typeof v === 'string' ? getSiteContent('booking', k, v) : v])
  ) as typeof rawBooking;

  const phoneNumber = getSiteContent('about', 'phoneNumber', '599 - 506 - 507');
  const phoneNumberFull = getSiteContent('about', 'phoneNumberFull', '+995 599 506 507');
  const emailAddress = getSiteContent('about', 'emailAddress', 'doctormago2018@gmail.com');
  const facebookUrl = getSiteContent('about', 'facebookUrl', 'https://www.facebook.com/eyeclinicMaGo/');
  const youtubeUrl = getSiteContent('about', 'youtubeUrl', 'https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q');
  const whatsappUrl = getSiteContent('about', 'whatsappUrl', 'https://wa.me/995599506507');

  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error: dbError } = await supabase.from('bookings').insert({
        preferred_date: null,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        age: form.age ? parseInt(form.age) : null,
        relationship: form.relationship,
        medical_history: form.medical_history,
      });

      if (dbError) throw dbError;

      const emailRes = await fetch(
        `${supabaseUrl}/functions/v1/send-booking-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
            age: form.age,
            relationship: form.relationship,
            medical_history: form.medical_history,
          }),
        }
      );

      if (!emailRes.ok) {
        console.warn('Email notification failed but booking was saved');
      }

      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <FloatingButtons />

      <main className="flex-1">
        <div className="bg-[#00265E] text-white text-center py-6 px-4">
          <h1 className="text-3xl md:text-4xl font-black tracking-widest">{t.pageTitle}</h1>
        </div>

        <div className="text-center py-5 px-4 bg-gray-50 border-b border-gray-100">
          <p className="text-2xl font-black text-[#003366] leading-tight">{t.clinicName}</p>
          <p className="text-xl font-bold text-[#003366] mt-1">{t.magotherapy}</p>
        </div>

        <div className="bg-[#00265E] text-white py-6 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0 opacity-80" />
                  <div>
                    <p className="font-bold text-lg">{t.workingHours} <span className="text-xl">{t.workingTime}</span></p>
                    <p className="text-sm opacity-80">{t.exceptWeekends}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 flex-shrink-0 mt-1 opacity-80" />
                  <div>
                    <p className="font-black text-xl leading-tight">{t.appointmentRequired}</p>
                  </div>
                </div>

                <div className="pl-8 space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0 opacity-70" />
                    <a href="tel:+995214302 8" className="font-black text-2xl tracking-wider hover:text-gray-200 transition">

                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 flex-shrink-0 opacity-70" />
                    <div>
                      <a href={`tel:${phoneNumberFull.replace(/\s/g, '')}`} className="font-black text-2xl tracking-wider hover:text-gray-200 transition">
                        {phoneNumber}
                      </a>
                      <span className="block text-sm opacity-75">{t.viberWhatsApp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <LeftContent
                  leftP1={t.leftP1}
                  leftP2={t.leftP2}
                  leftP3={t.leftP3}
                  leftP4={t.leftP4}
                  bannerText1={t.bannerText1}
                  bannerText2={t.bannerText2}
                  leftP5={t.leftP5}
                  leftP6={t.leftP6}
                  leftP7={t.leftP7}
                  leftP8={t.leftP8}
                  clinicBannerTitle={t.clinicBannerTitle}
                  clinicBannerText={t.clinicBannerText}
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-[#25D366] rounded-2xl shadow-xl p-8 text-white text-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">{tb.whatsAppHeading}</h2>
                    <p className="text-white/90 text-lg mb-6">{tb.whatsAppDesc}</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-white text-[#128C7E] font-black text-xl px-10 py-4 rounded-2xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-6 h-6" />
                      {tb.whatsAppButton}
                    </a>
                    <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold tracking-wider">{phoneNumberFull}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">{tb.orText}</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="bg-[#00265E] text-white px-8 py-5 flex items-center gap-3">
                    <Calendar className="w-6 h-6 opacity-80" />
                    <h2 className="text-xl font-bold">{tb.formTitle}</h2>
                  </div>

                  {status === 'success' ? (
                    <div className="p-12 flex flex-col items-center text-center gap-4">
                      <CheckCircle size={64} className="text-green-500" />
                      <h3 className="text-2xl font-bold text-[#00265E]">{tb.successTitle}</h3>
                      <p className="text-gray-600 text-lg">{tb.successMessage}</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1ebe5d] transition"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {tb.successWhatsApp}
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelName}</label>
                        <input
                          type="text"
                          name="full_name"
                          value={form.full_name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelEmail}</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelPhone}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelAge}</label>
                        <input
                          type="number"
                          name="age"
                          value={form.age}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelIAm}</label>
                        <select
                          name="relationship"
                          value={form.relationship}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition bg-white"
                        >
                          <option value="">{tb.optionChoose}</option>
                          <option value="patient">{tb.optionPatient}</option>
                          <option value="family">{tb.optionFamily}</option>
                          <option value="friend">{tb.optionFriend}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold mb-2 text-gray-800">{tb.labelHistory}</label>
                        <textarea
                          name="medical_history"
                          value={form.medical_history}
                          onChange={handleChange}
                          rows={5}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00265E] transition resize-none"
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#00265E]" />
                        <span className="text-gray-700">{tb.agreePolicy}</span>
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle size={18} />
                          <span>{tb.errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-[#00265E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#003366] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
                      >
                        {status === 'loading' && <Loader size={20} className="animate-spin" />}
                        {status === 'loading' ? tb.submitting : tb.submit}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="py-5 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-5xl flex flex-wrap items-center gap-5 justify-center text-gray-600">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-[#00265E] hover:text-white hover:border-[#00265E] transition-all"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-[#00265E] hover:text-white hover:border-[#00265E] transition-all"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a href={`tel:${phoneNumberFull.replace(/\s/g, '')}`} className="flex items-center gap-2 font-semibold hover:text-[#00265E] transition">
              <Phone className="w-4 h-4" />
              {phoneNumberFull}
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="font-medium hover:text-[#00265E] transition"
            >
              {emailAddress}
            </a>
          </div>
        </div>

        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1489.236875110299!2d44.795076188853244!3d41.71029496362771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d27c2b22b95%3A0xbd497533be82a6aa!2sMago+Eye+Clinic!5e0!3m2!1sen!2sge!4v1541776462854"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mago Eye Clinic location"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
