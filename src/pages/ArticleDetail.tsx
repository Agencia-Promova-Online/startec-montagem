import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Share2, Instagram, MapPin, Send } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  content: string;
};

const INSTAGRAM_URL = 'https://instagram.com/startecmontagem';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'SH Arniqueiras Col. Agrícola Arniqueira - Taguatinga, Brasília - DF'
)}`;
const WEBHOOK_URL = 'https://n8n.promovaonline.com.br/webhook/leads-startec-montagem';

export default function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [shareFeedback, setShareFeedback] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/articles.json')
      .then((r) => r.json())
      .then((data: Article[]) => {
        setArticles(data);
        setArticle(data.find((a) => a.slug === slug) || null);
      })
      .catch(() => {
        setArticles([]);
        setArticle(null);
      });
  }, [slug]);

  const related = useMemo(
    () => articles.filter((a) => a.slug !== slug).slice(0, 3),
    [articles, slug]
  );

  const pageTitle = useMemo(() => (article ? `${article.title} | Startec Montagem` : 'Artigo | Startec Montagem'), [article]);

  useEffect(() => {
    document.title = pageTitle;
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta && article) meta.content = article.description;
  }, [pageTitle, article]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, text: article?.description, url });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback('Link copiado!');
      setTimeout(() => setShareFeedback(''), 2500);
    } catch {
      setShareFeedback('Não foi possível copiar o link.');
      setTimeout(() => setShareFeedback(''), 2500);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const params = new URLSearchParams(window.location.search);
      const utm = {
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_term: params.get('utm_term') || '',
        utm_content: params.get('utm_content') || '',
        referrer: document.referrer || '',
        page_url: window.location.href,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          utm,
          source: 'artigo',
          article: article?.slug || '',
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar mensagem');

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      navigate('/obrigado');
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="py-20 bg-white">
      <div className="w-full md:w-1/2 mx-auto px-4">
        <div className="container mx-auto px-6">
          <article>
            <div className="mb-8">
              <img src={article.imageUrl} alt={article.title} className="w-full h-72 md:h-[420px] object-cover rounded-2xl shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{article.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{article.description}</p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Compartilhar"
                title="Compartilhar"
                className="inline-flex items-center justify-center gap-2 bg-[#ff8a3b] text-white p-3 md:px-5 md:py-2.5 rounded-lg hover:bg-[#ff7722] transition-colors font-semibold"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden md:inline">Compartilhar</span>
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white p-3 md:px-5 md:py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                <Instagram className="w-5 h-5" />
                <span className="hidden md:inline">Instagram</span>
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Como chegar"
                title="Como chegar"
                className="inline-flex items-center justify-center gap-2 bg-[#4285F4] text-white p-3 md:px-5 md:py-2.5 rounded-lg hover:bg-[#357ae8] transition-colors font-semibold"
              >
                <MapPin className="w-5 h-5" />
                <span className="hidden md:inline">Como chegar</span>
              </a>
              {shareFeedback && (
                <span className="text-sm text-gray-600">{shareFeedback}</span>
              )}
            </div>

            <div className="prose max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-p:text-gray-700" dangerouslySetInnerHTML={{ __html: article.content }} />

            <div className="mt-10">
              <Link to="/" className="inline-block bg-[#ff8a3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff7722] transition-colors">Voltar</Link>
            </div>
          </article>
        </div>
      </div>

      

      <section className="mt-20 bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Precisa de um barramento blindado?
              </h2>
              <p className="text-lg text-gray-600">
                Solicite um orçamento sem compromisso e fale com nossa equipe.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-name" className="block text-gray-700 font-semibold mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="cta-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cta-email" className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="cta-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="cta-phone" className="block text-gray-700 font-semibold mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                    placeholder="(61) 98524-0010"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cta-company" className="block text-gray-700 font-semibold mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="cta-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label htmlFor="cta-message" className="block text-gray-700 font-semibold mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="cta-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent resize-none"
                  placeholder="Descreva seu projeto ou dúvida"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">{error}</div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
                  Mensagem enviada com sucesso!
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff8a3b] text-white px-8 py-4 rounded-lg hover:bg-[#ff7722] transition-all flex items-center justify-center gap-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Solicitar Orçamento'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mt-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block text-[#ff8a3b] font-semibold tracking-wide">Continue lendo</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Artigos Sugeridos</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((a) => (
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
      )}
    </div>
  );
}
