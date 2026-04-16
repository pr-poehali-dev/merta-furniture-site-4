import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products, categoryLabels, materialLabels, ProductCategory, ProductMaterial, Product } from '@/data/products';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

const ALL = 'all';

export default function Catalog({ onAddToCart }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | typeof ALL>(ALL);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial | typeof ALL>(ALL);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const filtered = products.filter((p) => {
    const catOk = selectedCategory === ALL || p.category === selectedCategory;
    const matOk = selectedMaterial === ALL || p.material === selectedMaterial;
    const minOk = !priceMin || p.price >= Number(priceMin);
    const maxOk = !priceMax || p.price <= Number(priceMax);
    return catOk && matOk && minOk && maxOk;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 1500);
  };

  const clearFilters = () => {
    setSelectedCategory(ALL);
    setSelectedMaterial(ALL);
    setPriceMin('');
    setPriceMax('');
  };

  const hasFilters = selectedCategory !== ALL || selectedMaterial !== ALL || priceMin || priceMax;

  return (
    <section id="catalog" className="py-20 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-tag mb-2">Ассортимент</p>
            <h2 className="section-title">Каталог</h2>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 text-sm tracking-wider uppercase font-medium border px-5 py-2.5 transition-all duration-300 ${
              filterOpen || hasFilters
                ? 'bg-black text-white border-black'
                : 'border-border text-foreground hover:border-black'
            }`}
          >
            <Icon name="SlidersHorizontal" size={15} />
            Фильтры
            {hasFilters && <span className="bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">!</span>}
          </button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white border border-border p-6 mb-10 animate-slide-down">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <p className="label-tag mb-3">Тип мебели</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(ALL)}
                    className={`text-xs px-3 py-1.5 border transition-all ${selectedCategory === ALL ? 'bg-black text-white border-black' : 'border-border hover:border-black'}`}
                  >
                    Все
                  </button>
                  {(Object.keys(categoryLabels) as ProductCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 border transition-all ${selectedCategory === cat ? 'bg-black text-white border-black' : 'border-border hover:border-black'}`}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <p className="label-tag mb-3">Материал</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedMaterial(ALL)}
                    className={`text-xs px-3 py-1.5 border transition-all ${selectedMaterial === ALL ? 'bg-black text-white border-black' : 'border-border hover:border-black'}`}
                  >
                    Все
                  </button>
                  {(Object.keys(materialLabels) as ProductMaterial[]).map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`text-xs px-3 py-1.5 border transition-all ${selectedMaterial === mat ? 'bg-black text-white border-black' : 'border-border hover:border-black'}`}
                    >
                      {materialLabels[mat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="label-tag mb-3">Цена (₽)</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="input-merta flex-1 text-xs"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="input-merta flex-1 text-xs"
                  />
                </div>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    <Icon name="X" size={12} />
                    Сбросить
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="PackageX" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm tracking-wider">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map((product) => (
              <div key={product.id} className="product-card bg-white relative flex flex-col">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="label-tag mb-1">{categoryLabels[product.category]} / {materialLabels[product.material]}</p>
                  <h3 className="font-display text-xl font-normal text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-light">{product.price.toLocaleString('ru')} ₽</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                        addedIds.includes(product.id)
                          ? 'bg-black text-white border-black'
                          : 'border-black text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      <Icon name={addedIds.includes(product.id) ? 'Check' : 'Plus'} size={13} />
                      {addedIds.includes(product.id) ? 'Добавлено' : 'В корзину'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center label-tag mt-8">{filtered.length} товаров</p>
      </div>
    </section>
  );
}
