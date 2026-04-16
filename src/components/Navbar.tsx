import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onAuthOpen: () => void;
  isLoggedIn: boolean;
  userName?: string;
  onProfileOpen: () => void;
}

const navItems = [
  { label: 'Главная', href: '#hero' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Рекомендации', href: '#recommendations' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar({ cartCount, onCartOpen, onAuthOpen, isLoggedIn, userName, onProfileOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black shadow-lg'
            : 'bg-white/90 backdrop-blur-sm border-b border-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className={`font-display text-2xl font-light tracking-[0.25em] uppercase transition-colors duration-500 ${
                scrolled ? 'text-white' : 'text-foreground'
              }`}
            >
              MERTA
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`nav-link transition-colors duration-500 ${
                    scrolled
                      ? 'text-white/80 hover:text-white'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <button
                  onClick={onProfileOpen}
                  className={`nav-link flex items-center gap-1.5 transition-colors duration-500 ${
                    scrolled ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Icon name="User" size={16} />
                  <span className="hidden sm:inline text-xs">{userName}</span>
                </button>
              ) : (
                <button
                  onClick={onAuthOpen}
                  className={`nav-link transition-colors duration-500 ${
                    scrolled ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Icon name="User" size={16} />
                </button>
              )}

              <button
                onClick={onCartOpen}
                className={`nav-link relative transition-colors duration-500 ${
                  scrolled ? 'text-white/80 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Icon name="ShoppingBag" size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className={`md:hidden transition-colors duration-500 ${
                  scrolled ? 'text-white' : 'text-foreground'
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-16 flex flex-col px-8 py-10 animate-slide-down md:hidden">
          <nav className="flex flex-col gap-6 mt-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="font-display text-3xl font-light text-white/90 hover:text-white text-left transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
