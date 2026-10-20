import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const scrollToForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      aria-label="Ir para formulário de contato"
      onClick={scrollToForm}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl hover:bg-[#1ebe57] transition-all flex items-center justify-center"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}

