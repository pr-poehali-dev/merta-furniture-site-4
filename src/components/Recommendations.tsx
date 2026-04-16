import Icon from '@/components/ui/icon';
import { products, categoryLabels, Product } from '@/data/products';

interface RecommendationsProps {
  onAddToCart: (product: Product) => void;
}

export default function Recommendations({ onAddToCart }: RecommendationsProps) {
  const recommended = products.filter((p) => p.recommended);

  return (
    <section id="recommendations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="label-tag mb-2">Для вас</p>
          <h2 className="section-title">Рекомендуем</h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
            Самые популярные позиции — выбор наших клиентов
          </p>
        </div>

        {/* Marquee line */}
        <div className="overflow-hidden border-y border-border py-3 mb-14">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) =>
              ['Кухни', 'Спальни', 'Шкафы', 'Диваны', 'Гостиные', 'Премиум качество', 'Производство Краснодар'].map((t) => (
                <span key={`${i}-${t}`} className="label-tag text-foreground/40 flex items-center gap-4">
                  {t} <span className="text-foreground/20">◆</span>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((product, idx) => (
            <div
              key={product.id}
              className="group relative bg-white border border-border overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s ease' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </div>

              <div className="p-4">
                <p className="label-tag mb-1">{categoryLabels[product.category]}</p>
                <h3 className="font-display text-lg font-normal mb-3">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl">
                    {product.price.toLocaleString('ru')} ₽
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-9 h-9 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              </div>

              {product.badge && (
                <div className="absolute top-3 right-3 bg-black text-white text-[10px] tracking-widest uppercase px-2 py-1">
                  {product.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
