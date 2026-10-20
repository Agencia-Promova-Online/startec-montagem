import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  useEffect(() => {
    document.title = 'Obrigado | Startec Montagem';
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.content = 'Obrigado pelo seu contato. Em breve nossa equipe retornará.';
  }, []);

  const whatsappUrl =
    'https://wa.me/5561985240010?text=' +
    encodeURIComponent('Olá! Enviei um formulário no site e gostaria de continuar o atendimento.');

  return (
    <section className="py-60 bg-white">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Obrigado!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Recebemos sua mensagem e em breve entraremos em contato. Se preferir, fale conosco agora
          pelo WhatsApp.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors"
          >
            Falar no WhatsApp
          </a>
          <Link
            to="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-[#ff8a3b] hover:text-[#ff8a3b] transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}

