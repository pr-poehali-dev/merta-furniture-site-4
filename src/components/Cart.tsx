import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';

interface CartItem extends Product {
  qty: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
}

export default function Cart({ isOpen, onClose, items, onRemove, onQtyChange }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-display text-2xl font-light">Корзина</h2>
            <p className="label-tag mt-0.5">{items.length} товаров</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 border border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="ShoppingBag" size={40} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                  <div className="w-20 h-20 overflow-hidden shrink-0 bg-zinc-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base font-normal leading-tight mb-1">{item.name}</h4>
                    <p className="label-tag mb-3">{(item.price * item.qty).toLocaleString('ru')} ₽</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => onQtyChange(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        >
                          <Icon name="Minus" size={11} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => onQtyChange(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        >
                          <Icon name="Plus" size={11} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-border space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="label-tag">Итого</span>
              <span className="font-display text-3xl font-light">{total.toLocaleString('ru')} ₽</span>
            </div>
            <button className="w-full btn-primary text-center">
              Оформить заказ
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Точная стоимость уточняется после замера
            </p>
          </div>
        )}
      </div>
    </>
  );
}
