import { Zap, Settings, Wrench, CheckCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: 'Barramento Blindado',
      description: 'Sistemas completos de distribuição de energia elétrica com tecnologia busway',
      features: [
        'Alta capacidade de corrente',
        'Modular e flexível',
        'Segurança máxima',
      ],
    },
    {
      icon: Settings,
      title: 'Instalação',
      description: 'Serviço especializado de instalação e comissionamento de sistemas',
      features: [
        'Equipe técnica qualificada',
        'Instalação rápida',
        'Testes e certificação',
      ],
    },
    {
      icon: Wrench,
      title: 'Manutenção',
      description: 'Manutenção preventiva e corretiva para garantir máximo desempenho',
      features: [
        'Inspeções periódicas',
        'Suporte técnico',
        'Peças originais',
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para seus projetos de distribuição elétrica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-[#ff8a3b] to-[#ff7722] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#ff8a3b] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
