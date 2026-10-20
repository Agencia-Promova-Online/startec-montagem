import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
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
  const [utmData, setUtmData] = useState<{ [key: string]: string }>({});
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: { [key: string]: string } = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      referrer: document.referrer || '',
      page_url: window.location.href,
    };
    setUtmData(utm);

    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => setLocationData(data))
      .catch(() => setLocationData({ error: true }));
  }, []);

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
      const webhookUrl = 'https://n8n.promovaonline.com.br/webhook/leads-startec-montagem';

      const payload = {
        ...formData,
        utm: utmData,
        locationData,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      const sentData = { ...formData };
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });

      navigate('/obrigado');

      setTimeout(() => {
        const whatsappNumber = '5561985240010';
        const whatsappMessage = `Olá! Meu nome é ${sentData.name}. ${sentData.message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      }, 500);
    } catch (err) {
      setError('Erro ao enviar mensagem. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solicite um orçamento ou tire suas dúvidas com nossa equipe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="(61) 98524-0010"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a3b] focus:border-transparent resize-none"
                  placeholder="Descreva seu projeto ou dúvida"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
                  Mensagem enviada com sucesso! Redirecionando para WhatsApp...
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff8a3b] text-white px-8 py-4 rounded-lg hover:bg-[#ff7722] transition-all flex items-center justify-center gap-2 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8a3b] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Telefone</p>
                    <a
                      href="https://wa.me/5561985240010"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
                    >
                      (61) 98524-0010
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8a3b] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a
                      href="mailto:contato@startecmontagem.com.br"
                      className="text-gray-600 hover:text-[#ff8a3b] transition-colors"
                    >
                      startecmontagem@gmail.com                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#ff8a3b] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Localização</p>
                    <p className="text-gray-600">SH Arniqueiras Col. Agrícola Arniqueira - Taguatinga, Brasília - DF</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#ff8a3b] to-[#ff7722] p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Horário de Atendimento</h3>
              <p className="mb-2">Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 12h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
