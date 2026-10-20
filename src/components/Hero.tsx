import { ArrowRight } from 'lucide-react';
import projetoBusway from '../assets/projeto-busway.png';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#ff8a3b]/10 text-[#ff8a3b] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Soluções em Energia Elétrica
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Barramento Blindado
              <span className="text-[#ff8a3b]"> Busway</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Soluções eficientes e seguras para distribuição de energia elétrica.
              Tecnologia de ponta com instalação rápida e manutenção simplificada.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="bg-[#ff8a3b] text-white px-8 py-4 rounded-lg hover:bg-[#ff7722] transition-all flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open('https://wa.me/5561985240010', '_blank')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#ff8a3b] hover:text-[#ff8a3b] transition-all text-lg font-semibold"
              >
                WhatsApp
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={projetoBusway}
              alt="Projeto Busway"
              className="w-full h-64 md:h-[420px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
