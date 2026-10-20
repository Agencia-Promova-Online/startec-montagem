import { useEffect, useRef } from 'react';
import eBusiness from '../assets/clientes/E-business.jfif';
import lux from '../assets/clientes/LUZ.jpg';
import duo from '../assets/clientes/DUO.jpg';
import wishAeroporto from '../assets/clientes/Wish.jpg';
import wishBellavista from '../assets/clientes/wish-bellavista.jfif';
import wishCoimbra from '../assets/clientes/wish-coimbra.jpg';

export default function Clients() {
  const clients = [
    {
      title: 'E-Business',
      city: 'Aparecida de Goiânia - GO',
      imageUrl: eBusiness,
    },
    {
      title: 'Lux Flamboyant',
      city: 'Goiânia - GO',
      imageUrl: lux,
    },
    {
      title: 'DUO Residence & Mall',
      city: 'Águas Claras - DF',
      imageUrl: duo,
    },
    {
      title: 'Wish Aeroporto',
      city: 'Goiânia - GO',
      imageUrl: wishAeroporto,
    },
    {
      title: 'Wish Bella Vista',
      city: 'Goiânia - GO',
      imageUrl: wishBellavista,
    },
    {
      title: 'Wish Coimbra',
      city: 'Goiânia - GO',
      imageUrl: wishCoimbra,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gapPx = 24; // Tailwind gap-6
    const cardWidth = (first?.offsetWidth || 320) + gapPx;
    let timer: number | null = null;

    const scrollStep = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + cardWidth;
      el.scrollTo({ left: next > maxScroll ? 0 : next, behavior: 'smooth' });
    };

    const start = () => {
      if (timer) return;
      timer = window.setInterval(scrollStep, 3000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    start();
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);

    return () => {
      stop();
      el.removeEventListener('mouseenter', stop);
      el.removeEventListener('mouseleave', start);
    };
  }, []);

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clientes Atendidos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alguns dos empreendimentos onde já executamos nossos serviços
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
          aria-label="Carrossel de clientes"
        >
          {clients.map((c, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl shadow-lg overflow-hidden flex-shrink-0 w-[320px] h-[380px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img
                src={c.imageUrl}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl font-bold text-white">{c.title}</h3>
                <p className="text-sm text-gray-200">{c.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

