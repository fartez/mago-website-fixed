import { useState, FormEvent } from 'react';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSharedTranslations } from '../translations/shared';
import { supabase } from '../lib/supabase';

interface BookingModalProps {
  onClose: () => void;
}

interface FormData {
  preferred_date: string;
  full_name: string;
  email: string;
  phone: string;
  age: string;
  relationship: string;
  medical_history: string;
}

const emptyForm: FormData = {
  preferred_date: '',
  full_name: '',
  email: '',
  phone: '',
  age: '',
  relationship: '',
  medical_history: '',
};

export default function BookingModal({ onClose }: BookingModalProps) {
  const { language } = useLanguage();
  const t = useSharedTranslations(language);
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
        preferred_date: form.preferred_date || null,
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
            preferred_date: form.preferred_date,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-[#00265E] text-white p-6 rounded-t-xl flex justify-between items-center">
          <h3 className="text-xl font-bold">{t.modalTitle}</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition">
            <X size={24} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <CheckCircle size={56} className="text-green-500" />
            <h4 className="text-xl font-bold text-[#00265E]">{t.successTitle}</h4>
            <p className="text-gray-600">{t.successMessage}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#00265E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#003366] transition"
            >
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block font-bold mb-2">{t.labelDate}</label>
              <input
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelName}</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelEmail}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelPhone}</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelAge}</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelIAm}</label>
              <select
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
              >
                <option value="">{t.optionChoose}</option>
                <option value="patient">{t.optionPatient}</option>
                <option value="family">{t.optionFamily}</option>
                <option value="friend">{t.optionFriend}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">{t.labelHistory}</label>
              <textarea
                name="medical_history"
                value={form.medical_history}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#00265E]"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-base">{t.agreePolicy}</span>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle size={18} />
                <span className="text-base">{t.errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#00265E] text-white py-3 rounded-lg font-bold hover:bg-[#003366] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' && <Loader size={18} className="animate-spin" />}
              {status === 'loading' ? t.submitting : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
