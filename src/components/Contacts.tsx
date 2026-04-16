import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="label-tag text-white/40 mb-4">Свяжитесь с нами</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-10">
              Обсудим<br />
              <span className="italic text-white/60">ваш проект</span>
            </h2>

            <div className="space-y-6">
              <a
                href="tel:+79181300668"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Icon name="Phone" size={16} />
                </div>
                <div>
                  <p className="label-tag text-white/40 mb-0.5">Телефон</p>
                  <p className="text-white font-medium text-lg">+7 918 130-06-68</p>
                </div>
              </a>

              <a
                href="mailto:vadimvodinov28@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Icon name="Mail" size={16} />
                </div>
                <div>
                  <p className="label-tag text-white/40 mb-0.5">Почта</p>
                  <p className="text-white font-medium">vadimvodinov28@gmail.com</p>
                </div>
              </a>

              <a
                href="https://instagram.com/kuhni_merta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Icon name="Instagram" size={16} />
                </div>
                <div>
                  <p className="label-tag text-white/40 mb-0.5">Instagram</p>
                  <p className="text-white font-medium">@kuhni_merta</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={16} />
                </div>
                <div>
                  <p className="label-tag text-white/40 mb-0.5">Адрес</p>
                  <p className="text-white/80">Краснодар, Россия</p>
                  <p className="text-white/40 text-sm mt-1">Производство и шоу-рум</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="label-tag text-white/30 mb-2">Создатель компании</p>
              <p className="text-white/80 font-medium">Водинов Степан Николаевич</p>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="label-tag text-white/40 mb-6">Оставьте заявку</p>
            {sent ? (
              <div className="border border-white/20 p-8 text-center animate-fade-in">
                <Icon name="CheckCircle" size={40} className="mx-auto mb-4 text-white/60" />
                <p className="font-display text-2xl font-light mb-2">Заявка отправлена</p>
                <p className="text-white/40 text-sm">Мы свяжемся с вами в течение рабочего дня</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Опишите ваш проект"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-zinc-200 transition-colors"
                >
                  Отправить заявку
                </button>
                <p className="text-white/20 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
