import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/articles.json')
      .then((r) => r.json())
      .then((data) => setArticles(data))
      .catch(() => setArticles([]));
  }, []);

  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#ff8a3b] font-semibold tracking-wide">Artigos</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Artigos sobre Barramento Blindado</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Conteúdos técnicos e práticos para melhores decisões em seus projetos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((a) => (
            <article key={a.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <img src={a.imageUrl} alt={a.title} className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{a.title}</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">{a.description}</p>
                <div className="mt-6">
                  <Link
                    to={`/artigos/${a.slug}`}
                    className="inline-block bg-[#ff8a3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff7722] transition-colors"
                  >
                    Ler matéria completa
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

