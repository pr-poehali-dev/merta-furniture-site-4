import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Recommendations from '@/components/Recommendations';
import Calculator from '@/components/Calculator';
import About from '@/components/About';
import Contacts from '@/components/Contacts';
import Cart from '@/components/Cart';
import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
import Footer from '@/components/Footer';
import { Product } from '@/data/products';

interface CartItem extends Product {
  qty: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const changeQty = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    }
  };

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onAuthOpen={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onProfileOpen={() => setProfileOpen(true)}
      />

      <main>
        <Hero />
        <Recommendations onAddToCart={addToCart} />
        <Catalog onAddToCart={addToCart} />
        <Calculator />
        <About />
        <Contacts />
      </main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onQtyChange={changeQty}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        userName={userName}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;