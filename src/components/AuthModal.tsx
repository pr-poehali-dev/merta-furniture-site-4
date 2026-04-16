import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

type Mode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name || email.split('@')[0];
    onLogin(displayName, email);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-border">
            <h2 className="font-display text-2xl font-light">
              {mode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 text-xs tracking-[0.12em] uppercase font-medium transition-all ${
                  mode === m
                    ? 'bg-black text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'login' ? 'Войти' : 'Создать аккаунт'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-7 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="label-tag block mb-1.5">Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-merta"
                />
              </div>
            )}
            <div>
              <label className="label-tag block mb-1.5">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-merta"
              />
            </div>
            <div>
              <label className="label-tag block mb-1.5">Пароль</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-merta"
              />
            </div>

            <button type="submit" className="btn-primary w-full text-center mt-6">
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>

            <p className="text-center text-xs text-muted-foreground mt-2">
              {mode === 'login' ? (
                <>Нет аккаунта? <button type="button" className="underline hover:text-foreground" onClick={() => setMode('register')}>Создать</button></>
              ) : (
                <>Уже есть аккаунт? <button type="button" className="underline hover:text-foreground" onClick={() => setMode('login')}>Войти</button></>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
