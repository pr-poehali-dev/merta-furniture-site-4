export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-3xl font-light tracking-[0.2em] mb-3">MERTA</p>
            <p className="text-white/40 text-sm leading-relaxed">
              Производство мебели в Краснодаре. Кухни, шкафы, спальни, диваны.
            </p>
          </div>

          <div>
            <p className="label-tag text-white/30 mb-4">Навигация</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Главная', href: '#hero' },
                { label: 'Каталог', href: '#catalog' },
                { label: 'Рекомендации', href: '#recommendations' },
                { label: 'Калькулятор', href: '#calculator' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tag text-white/30 mb-4">Компания</p>
            <ul className="space-y-2.5">
              {[
                { label: 'О нас', href: '#about' },
                { label: 'Контакты', href: '#contacts' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-tag text-white/30 mb-4">Контакты</p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+79181300668" className="text-sm text-white/50 hover:text-white transition-colors">
                  +7 918 130-06-68
                </a>
              </li>
              <li>
                <a href="mailto:vadimvodinov28@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors">
                  vadimvodinov28@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/kuhni_merta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  @kuhni_merta
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">© 2024 Merta. Все права защищены.</p>
          <p className="text-white/20 text-xs">Водинов Степан Николаевич</p>
        </div>
      </div>
    </footer>
  );
}
