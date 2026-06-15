import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSharedTranslations } from '../translations/shared';

interface FloatingButtonsProps {
  onBookClick?: () => void;
}

export default function FloatingButtons({ onBookClick }: FloatingButtonsProps) {
  const { language } = useLanguage();
  const t = useSharedTranslations(language);
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 items-end">
      <a
        href="https://wa.me/995599506507"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white px-5 py-4 rounded-xl shadow-2xl hover:bg-[#1ebe5d] transition-all text-center flex flex-col items-center gap-1"
        title={t.whatsAppBtn}
      >
        <MessageCircle size={28} strokeWidth={2} />
        <div className="text-xs font-bold leading-tight max-w-[80px]">
          {t.whatsAppBtn}
        </div>
      </a>

      <button
        onClick={handleBookClick}
        className="bg-[#00265E] text-white px-6 py-4 rounded-xl shadow-2xl hover:bg-[#003366] transition-all text-center"
      >
        <div className="text-2xl mb-2">✏️</div>
        <div className="text-sm font-bold leading-tight">
          {t.bookBtn1}<br />{t.bookBtn2}<br />{t.bookBtn3}
        </div>
      </button>
    </div>
  );
}
