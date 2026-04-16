const bedroomImage = 'https://cdn.poehali.dev/projects/ef1688b3-a987-4041-b5a3-f5314c9633dd/files/64443143-aa0c-4318-92db-14069c3751ca.jpg';

const stats = [
  { value: '12+', label: 'лет на рынке' },
  { value: '2400+', label: 'выполненных проектов' },
  { value: '100%', label: 'собственное производство' },
  { value: '5 лет', label: 'гарантия на изделия' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={bedroomImage}
                alt="Производство Merta"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 hidden md:block">
              <p className="font-display text-3xl font-light">Краснодар</p>
              <p className="label-tag text-white/50 mt-1">Собственное производство</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="label-tag mb-4">О компании</p>
            <h2 className="section-title mb-6">
              Merta — это<br />
              <span className="italic text-foreground/60">не просто мебель</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Компания основана Водиновым Степаном Николаевичем. За 12 лет работы
              мы превратились из небольшой мастерской в полноценное производство
              с собственным цехом и командой опытных мастеров.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Каждый предмет мебели проходит несколько этапов контроля качества.
              Мы используем только проверенные материалы и фурнитуру европейских
              производителей. Производим кухни, шкафы, спальни, диваны и офисную мебель.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-border border border-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-5">
                  <p className="font-display text-3xl font-light text-foreground mb-1">{s.value}</p>
                  <p className="label-tag">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
