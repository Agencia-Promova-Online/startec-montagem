import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
};

const ARTICLES_PER_PAGE = 10;

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Blog | Startec Montagem';
    fetch('/articles.json')
      .then((r) => r.json())
      .then((data: Article[]) => setArticles(data))
      .catch(() => setArticles([]));
  }, []);

  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));

  const paginated = useMemo(
    () => articles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE),
    [articles, currentPage]
  );

  const goToPage = (page: number) => {
    const target = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageButtonClass = (page: number) =>
    `min-w-[40px] h-10 px-3 rounded-lg font-semibold transition-colors ${
      page === currentPage
        ? 'bg-[#ff8a3b] text-white'
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
    }`;

  return (
    <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#ff8a3b] font-semibold tracking-wide">Artigos</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Conteúdos técnicos e práticos sobre barramento blindado (busway) para melhores decisões em seus projetos
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum artigo disponível no momento.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {paginated.map((a) => (
              <article key={a.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                <img src={a.imageUrl} alt={a.title} className="w-full h-56 object-cover" loading="lazy" />
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{a.title}</h2>
                  <p className="text-gray-600 mt-2 leading-relaxed flex-1">{a.description}</p>
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
        )}

        {articles.length > 0 && (
          <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginação">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className="w-10 h-10 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={pageButtonClass(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
              className="w-10 h-10 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
