import logo23 from '../assets/logo/Ativo 23.png'

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          <img src={logo23} className='h-20'/>
          </div>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('clients')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Clientes
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
            >
              Contato
            </button>
          </nav>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#ff8a3b] text-white px-6 py-2 rounded-lg hover:bg-[#ff7722] transition-colors"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </header>
  );
}
