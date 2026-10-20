import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  content: string;
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch('/articles.json')
      .then((r) => r.json())
      .then((data: Article[]) => {
        const found = data.find((a) => a.slug === slug);
        setArticle(found || null);
      })
      .catch(() => setArticle(null));
  }, [slug]);

  const pageTitle = useMemo(() => (article ? `${article.title} | Startec Montagem` : 'Artigo | Startec Montagem'), [article]);

  useEffect(() => {
    document.title = pageTitle;
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta && article) meta.content = article.description;
  }, [pageTitle, article]);

  if (!article) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <p className="text-gray-700">Artigo não encontrado.</p>
          <Link to="/" className="text-[#ff8a3b] hover:text-[#ff7722]">Voltar para a página inicial</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="py-20 px-4 bg-white w-full md:w-1/2 mx-auto ">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <img src={article.imageUrl} alt={article.title} className="w-full h-72 md:h-[420px] object-cover rounded-2xl shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{article.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{article.description}</p>
        <div className="prose max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="mt-10">
          <Link to="/" className="inline-block bg-[#ff8a3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff7722] transition-colors">Voltar</Link>
        </div>
      </div>
    </article>
  );
}

