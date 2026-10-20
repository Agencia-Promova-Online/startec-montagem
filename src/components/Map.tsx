export default function Map() {
  const mapAddress = 'SH Arniqueiras Col. Agrícola Arniqueira - Taguatinga, Brasília - DF';
  const mapsLink = 'https://maps.app.goo.gl/4ozcfoKbDnVTvJfB8';

  const embedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.0237850617027!2d-48.0322184881908!3d-15.85534718473012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2dda4579b119%3A0x6ea5056957d792c3!2sStartec%20Montagem!5e0!3m2!1spt-BR!2sus!4v1765464724581!5m2!1spt-BR!2sus`;

  return (
    <section id="map" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Onde Estamos</h2>
          <p className="text-gray-600 mt-2">{mapAddress}</p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Mapa de localização"
            src={embedSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ff8a3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff7722] transition-colors"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

