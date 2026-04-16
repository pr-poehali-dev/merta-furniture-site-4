import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  date: string;
  items: string;
  total: number;
  status: string;
}

const mockOrders: Order[] = [
  { id: '#MR-2024-001', date: '12 января 2024', items: 'Кухня "Прованс"', total: 145000, status: 'Выполнен' },
  { id: '#MR-2024-018', date: '5 марта 2024', items: 'Шкаф-купе "Слим" × 2', total: 116000, status: 'В работе' },
  { id: '#MR-2024-031', date: '14 апреля 2024', items: 'Диван "Комфорт"', total: 78000, status: 'На замере' },
];

const statusColor: Record<string, string> = {
  'Выполнен': 'bg-zinc-100 text-zinc-600',
  'В работе': 'bg-black text-white',
  'На замере': 'bg-zinc-800 text-white',
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onLogout: () => void;
}

export default function ProfileModal({ isOpen, onClose, userName, onLogout }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg animate-scale-in max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-border shrink-0">
            <div>
              <h2 className="font-display text-2xl font-light">Личный кабинет</h2>
              <p className="label-tag mt-0.5">{userName}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            <p className="label-tag mb-4">История заказов</p>
            {mockOrders.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Icon name="Package" size={32} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Заказов пока нет</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-border p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="label-tag mt-0.5">{order.date}</p>
                      </div>
                      <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 ${statusColor[order.status] || 'bg-zinc-100'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="font-display text-xl font-light mt-2">{order.total.toLocaleString('ru')} ₽</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 py-5 border-t border-border shrink-0">
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="LogOut" size={15} />
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
