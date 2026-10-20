import barraEspacada from '../assets/produtos/barra-espacada.png';
import compactoBarraColada from '../assets/produtos/compacto-de-barra-colada.png';
import barramentoVentilado from '../assets/produtos/imagem-barramento-ventilado.webp';
import quadroComando from '../assets/produtos/quadro-eletrico-comando.jpg';
import qgbt from '../assets/produtos/imagem-qgbt.jpg';
import cofreDerivacao from '../assets/produtos/cofre-derivacao-busway.webp';

export default function Products() {
  const items = [
    {
      title: 'Barramento Blindado',
      subtitle: '(Barra Espaçada)',
      description:
        'Sistema modular de distribuição com barras espaçadas para alta corrente e segurança.',
      imageUrl: barraEspacada,
    },
    {
      title: 'Barramento Blindado',
      subtitle: '(Compacto de Barra Colada)',
      description:
        'Design compacto com barras coladas, ideal para espaços reduzidos e eficiência térmica.',
      imageUrl: compactoBarraColada,
    },
    {
      title: 'Barramento Blindado',
      subtitle: '(Barramento Ventilado)',
      description:
        'Estrutura ventilada que melhora dissipação de calor para aplicações de alta carga.',
      imageUrl: barramentoVentilado,
    },
    {
      title: 'Quadro de Comando',
      subtitle: '(Caixa para montagem de Painel Elétrico)',
      description:
        'Caixa robusta para montagem de painéis elétricos com proteção e organização.',
      imageUrl: quadroComando,
    },
    {
      title: 'Quadro Geral',
      subtitle: '(Baixa Tensão)',
      description:
        'QGBT para distribuição em baixa tensão com seccionamento e proteção confiáveis.',
      imageUrl: qgbt,
    },
    {
      title: 'Cofre de Derivação',
      subtitle: '',
      description:
        'Módulo de derivação para busway com conexão segura e manutenção simples.',
      imageUrl: cofreDerivacao,
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#ff8a3b] font-semibold tracking-wide">Produtos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Produtos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Experimente a revolução em eficiência energética com nosso busway de última geração.
            Um passo à frente da concorrência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-1">
                <h5 className="text-2xl font-bold text-gray-900">{item.title}</h5>
                <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
                {item.subtitle && (
                  <h6 className="text-gray-600 mt-2">{item.subtitle}</h6>
                )}
                <div className="mt-auto pt-6">
                  <a
                    href="#contact"
                    className="inline-block bg-[#ff8a3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff7722] transition-colors"
                  >
                    Saiba Mais
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

