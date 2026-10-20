import { Facebook, Instagram, Linkedin } from 'lucide-react';
import logo25 from '../assets/logo/Ativo 25.png'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
            <img src={logo25} className='h-20'/>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Soluções eficientes e seguras em barramento blindado (busway) para distribuição de energia elétrica.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#clients" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Clientes
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#ff8a3b] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Barramento Blindado</li>
              <li className="text-gray-400">Instalação e Montagem</li>
              <li className="text-gray-400">Manutenção Preventiva</li>
              <li className="text-gray-400">Consultoria Técnica</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#ff8a3b] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#ff8a3b] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#ff8a3b] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Startec Montagem. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
