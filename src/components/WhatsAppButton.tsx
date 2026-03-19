import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27845586640"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
