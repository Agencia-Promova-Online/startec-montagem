import { Shield, Clock, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Sistemas blindados que garantem máxima proteção e confiabilidade',
    },
    {
      icon: Clock,
      title: 'Eficiência',
      description: 'Instalação rápida e manutenção simplificada para seu projeto',
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Produtos certificados com os mais altos padrões da indústria',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre Nós
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Startec Montagem é especializada em soluções de barramento blindado (busway),
            oferecendo tecnologia de ponta para distribuição eficiente de energia elétrica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-[#ff8a3b] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
