import { useState } from 'react';
import Icon from '@/components/ui/icon';

type FurnitureType = 'kitchen' | 'wardrobe' | 'bedroom' | 'sofa' | 'hallway' | 'office';
type Material = 'ldsp' | 'mdf_paint' | 'mdf_veneer' | 'massiv' | 'fabric' | 'leather';
type Complexity = 'simple' | 'medium' | 'complex';

const furnitureTypes: { value: FurnitureType; label: string; icon: string }[] = [
  { value: 'kitchen', label: 'Кухня', icon: 'ChefHat' },
  { value: 'wardrobe', label: 'Шкаф-купе', icon: 'LayoutGrid' },
  { value: 'bedroom', label: 'Спальня', icon: 'Bed' },
  { value: 'sofa', label: 'Диван', icon: 'Sofa' },
  { value: 'hallway', label: 'Прихожая', icon: 'DoorOpen' },
  { value: 'office', label: 'Кабинет', icon: 'Monitor' },
];

const materials: { value: Material; label: string; pricePerM2: number }[] = [
  { value: 'ldsp', label: 'ЛДСП', pricePerM2: 4500 },
  { value: 'mdf_paint', label: 'МДФ крашеный', pricePerM2: 7500 },
  { value: 'mdf_veneer', label: 'МДФ шпон', pricePerM2: 11000 },
  { value: 'massiv', label: 'Массив дерева', pricePerM2: 18000 },
  { value: 'fabric', label: 'Ткань (обивка)', pricePerM2: 3500 },
  { value: 'leather', label: 'Кожа (обивка)', pricePerM2: 8000 },
];

const complexityMult: Record<Complexity, { label: string; mult: number }> = {
  simple: { label: 'Простой', mult: 1.0 },
  medium: { label: 'Средний', mult: 1.35 },
  complex: { label: 'Сложный', mult: 1.7 },
};

const WORK_RATE = 0.30;
const DESIGN_RATE = 0.07;
const furnitureAreaBase: Record<FurnitureType, number> = { kitchen: 1.0, wardrobe: 0.8, bedroom: 1.2, sofa: 0.6, hallway: 0.7, office: 0.9 };

export default function Calculator() {
  const [furnitureType, setFurnitureType] = useState<FurnitureType>('kitchen');
  const [material, setMaterial] = useState<Material>('ldsp');
  const [complexity, setComplexity] = useState<Complexity>('medium');
  const [width, setWidth] = useState('3.0');
  const [height, setHeight] = useState('2.2');
  const [depth, setDepth] = useState('0.6');
  const [calculated, setCalculated] = useState(false);

  const getArea = () => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(depth) || 0;
    // Approximate surface area for furniture
    const base = furnitureAreaBase[furnitureType];
    return Math.max((w * h + w * d + h * d) * 2 * 0.4, base);
  };

  const getMaterialCost = () => {
    const mat = materials.find((m) => m.value === material)!;
    const area = getArea();
    const mult = complexityMult[complexity].mult;
    return Math.round(area * mat.pricePerM2 * mult);
  };

  const getWorkCost = () => Math.round(getMaterialCost() * WORK_RATE);
  const getDesignCost = () => Math.round((getMaterialCost() + getWorkCost()) * DESIGN_RATE);
  const getTotal = () => getMaterialCost() + getWorkCost() + getDesignCost();

  const fmt = (n: number) => n.toLocaleString('ru') + ' ₽';

  return (
    <section id="calculator" className="py-20 bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="label-tag text-white/40 mb-2">Онлайн расчёт</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">Калькулятор цены</h2>
          <p className="text-white/40 text-sm mt-3">Укажите параметры и получите предварительную стоимость</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-white/10">
          {/* Left: Settings */}
          <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8">
            {/* Type */}
            <div>
              <p className="label-tag text-white/40 mb-4">Тип мебели</p>
              <div className="grid grid-cols-3 gap-2">
                {furnitureTypes.map((ft) => (
                  <button
                    key={ft.value}
                    onClick={() => setFurnitureType(ft.value)}
                    className={`flex flex-col items-center gap-2 py-3 px-2 border text-xs transition-all ${
                      furnitureType === ft.value
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white/80'
                    }`}
                  >
                    <Icon name={ft.icon} fallback="LayoutGrid" size={18} />
                    {ft.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <p className="label-tag text-white/40 mb-4">Материал фасадов</p>
              <div className="grid grid-cols-2 gap-2">
                {materials.map((mat) => (
                  <button
                    key={mat.value}
                    onClick={() => setMaterial(mat.value)}
                    className={`flex items-center justify-between px-4 py-2.5 border text-sm transition-all ${
                      material === mat.value
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white/80'
                    }`}
                  >
                    <span>{mat.label}</span>
                    <span className="text-xs opacity-60">{(mat.pricePerM2 / 1000).toFixed(1)}к/м²</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <p className="label-tag text-white/40 mb-4">Размеры (метры)</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Ширина', value: width, set: setWidth },
                  { label: 'Высота', value: height, set: setHeight },
                  { label: 'Глубина', value: depth, set: setDepth },
                ].map(({ label, value, set }) => (
                  <div key={label}>
                    <p className="text-xs text-white/40 mb-1.5">{label}</p>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-white text-sm px-3 py-2.5 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <p className="label-tag text-white/40 mb-4">Сложность проекта</p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.entries(complexityMult) as [Complexity, { label: string; mult: number }][]).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setComplexity(key)}
                    className={`py-2.5 text-xs border transition-all ${
                      complexity === key
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-zinc-200 transition-colors"
            >
              Рассчитать стоимость
            </button>
          </div>

          {/* Right: Result */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between">
            <div>
              <p className="label-tag text-white/40 mb-6">Расчёт стоимости</p>
              {calculated ? (
                <div className="space-y-0 animate-fade-in">
                  <div className="border-b border-white/10 py-4 flex justify-between">
                    <span className="text-sm text-white/60">Материалы и фурнитура</span>
                    <span className="text-sm text-white font-medium">{fmt(getMaterialCost())}</span>
                  </div>
                  <div className="border-b border-white/10 py-4 flex justify-between">
                    <span className="text-sm text-white/60">Стоимость работы</span>
                    <span className="text-sm text-white font-medium">{fmt(getWorkCost())}</span>
                  </div>
                  <div className="border-b border-white/10 py-4 flex justify-between">
                    <span className="text-sm text-white/60">Дизайн (7%)</span>
                    <span className="text-sm text-white font-medium">{fmt(getDesignCost())}</span>
                  </div>
                  <div className="pt-6">
                    <p className="label-tag text-white/40 mb-2">Итого</p>
                    <p className="font-display text-4xl md:text-5xl font-light text-white">
                      {fmt(getTotal())}
                    </p>
                    <p className="text-white/30 text-xs mt-2">* Предварительный расчёт. Точная цена — после замера.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-white/20">
                  <Icon name="Calculator" size={40} className="mx-auto mb-4" />
                  <p className="text-sm">Заполните параметры<br />и нажмите «Рассчитать»</p>
                </div>
              )}
            </div>

            {calculated && (
              <div className="mt-8 space-y-3">
                <a
                  href="tel:+79181300668"
                  className="w-full border border-white/30 text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={14} />
                  Обсудить проект
                </a>
                <p className="text-center text-white/30 text-xs">+7 918 130-06-68</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}