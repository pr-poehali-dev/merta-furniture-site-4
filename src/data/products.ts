export type ProductCategory = 'kitchen' | 'bedroom' | 'wardrobe' | 'sofa' | 'living';
export type ProductMaterial = 'mdf' | 'massiv' | 'ldsp' | 'metal' | 'fabric' | 'leather';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  material: ProductMaterial;
  price: number;
  image: string;
  badge?: string;
  description: string;
  recommended?: boolean;
}

const kitchen = 'https://cdn.poehali.dev/projects/ef1688b3-a987-4041-b5a3-f5314c9633dd/files/33e444a7-459d-4f64-90f9-a3a1802e38db.jpg';
const bedroom = 'https://cdn.poehali.dev/projects/ef1688b3-a987-4041-b5a3-f5314c9633dd/files/64443143-aa0c-4318-92db-14069c3751ca.jpg';
const living = 'https://cdn.poehali.dev/projects/ef1688b3-a987-4041-b5a3-f5314c9633dd/files/f3d3cad6-d093-4cd6-9c40-11184e8ad1b9.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: 'Кухня "Прованс"',
    category: 'kitchen',
    material: 'mdf',
    price: 145000,
    image: kitchen,
    badge: 'Хит',
    description: 'Классическая кухня в стиле прованс с фрезеровкой',
    recommended: true,
  },
  {
    id: 2,
    name: 'Кухня "Минимал"',
    category: 'kitchen',
    material: 'ldsp',
    price: 89000,
    image: kitchen,
    badge: 'Новинка',
    description: 'Современная кухня без ручек, матовые фасады',
    recommended: true,
  },
  {
    id: 3,
    name: 'Спальня "Граф"',
    category: 'bedroom',
    material: 'massiv',
    price: 210000,
    image: bedroom,
    badge: 'Премиум',
    description: 'Спальный гарнитур из массива дуба',
    recommended: true,
  },
  {
    id: 4,
    name: 'Спальня "Нуар"',
    category: 'bedroom',
    material: 'mdf',
    price: 165000,
    image: bedroom,
    description: 'Тёмная спальня в современном стиле',
  },
  {
    id: 5,
    name: 'Шкаф-купе "Слим"',
    category: 'wardrobe',
    material: 'ldsp',
    price: 58000,
    image: bedroom,
    badge: 'Хит',
    description: '2-дверный шкаф-купе с зеркальными фасадами',
    recommended: true,
  },
  {
    id: 6,
    name: 'Шкаф "Гардероб"',
    category: 'wardrobe',
    material: 'mdf',
    price: 95000,
    image: bedroom,
    description: 'Просторный гардероб с системой хранения',
  },
  {
    id: 7,
    name: 'Диван "Комфорт"',
    category: 'sofa',
    material: 'fabric',
    price: 78000,
    image: living,
    badge: 'Новинка',
    description: 'Угловой диван с механизмом трансформации',
    recommended: true,
  },
  {
    id: 8,
    name: 'Диван "Лофт"',
    category: 'sofa',
    material: 'leather',
    price: 124000,
    image: living,
    badge: 'Премиум',
    description: 'Кожаный диван в стиле лофт',
  },
  {
    id: 9,
    name: 'Гостиная "Модерн"',
    category: 'living',
    material: 'ldsp',
    price: 68000,
    image: living,
    description: 'Стенка в гостиную с TV-зоной',
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  kitchen: 'Кухни',
  bedroom: 'Спальни',
  wardrobe: 'Шкафы',
  sofa: 'Диваны',
  living: 'Гостиные',
};

export const materialLabels: Record<ProductMaterial, string> = {
  mdf: 'МДФ',
  massiv: 'Массив дерева',
  ldsp: 'ЛДСП',
  metal: 'Металл',
  fabric: 'Ткань',
  leather: 'Кожа',
};
