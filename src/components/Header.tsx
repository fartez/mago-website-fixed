import { Facebook, Youtube } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end gap-4 py-2 flex-wrap">
          <a href="https://www.facebook.com/eyeclinicMaGo" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Facebook className="w-6 h-6 text-blue-600" />
          </a>
          <a href="https://www.youtube.com/channel/UCfWbr2cXHIoHqQPgGphWR0Q" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Youtube className="w-6 h-6 text-red-600" />
          </a>
          <div className="font-bold text-sm">
            Viber / WhatsApp: <a href="tel:+995599506507" className="hover:text-blue-600">(+995) 599 506 507</a>
          </div>
        </div>
      </div>
    </header>
  );
}
