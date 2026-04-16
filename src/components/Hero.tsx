import Icon from '@/components/ui/icon';

const heroImage = 'https://cdn.poehali.dev/projects/ef1688b3-a987-4041-b5a3-f5314c9633dd/files/33e444a7-459d-4f64-90f9-a3a1802e38db.jpg';

interface HeroProps {
  onCatalogClick: () => void;
}

export default function Hero({ onCatalogClick }: HeroProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with zoom animation */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Merta мебель"
          className="w-full h-full object-cover animate-hero-zoom"
          style={{ animationFillMode: 'forwards' }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl" style={{ animation: 'fade-in 1s ease-out 0.3s both' }}>
          <p className="label-tag text-white/60 mb-6 tracking-[0.3em]" style={{ animation: 'fade-in 0.8s ease-out 0.1s both' }}>
            Производство мебели — Краснодар
          </p>
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-6"
            style={{ animation: 'fade-in 0.8s ease-out 0.2s both' }}
          >
            Мебель<br />
            <span className="italic text-white/75">с характером</span>
          </h1>
          <p
            className="text-white/65 text-base md:text-lg font-sans font-light max-w-md mb-10 leading-relaxed"
            style={{ animation: 'fade-in 0.8s ease-out 0.35s both' }}
          >
            Кухни, шкафы, спальни и диваны — создаём мебель,
            которая служит десятилетиями
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'fade-in 0.8s ease-out 0.5s both' }}
          >
            <button className="btn-primary" onClick={() => scrollTo('#catalog')}>
              Смотреть каталог
            </button>
            <button
              className="border border-white/40 text-white px-6 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
              onClick={() => scrollTo('#calculator')}
            >
              Рассчитать стоимость
            </button>
          </div>

          {/* Instagram link */}
          <a
            href="https://instagram.com/kuhni_merta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-white/50 hover:text-white/80 transition-colors text-sm"
            style={{ animation: 'fade-in 0.8s ease-out 0.65s both' }}
          >
            <Icon name="Instagram" size={16} />
            <span className="tracking-wider">@kuhni_merta</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Листай</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white/60 animate-bounce absolute" />
        </div>
      </div>
    </section>
  );
}
