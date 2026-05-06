import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2ca4c4f-6481-4d25-9503-c3b1746f8503/files/080f2cab-f975-4480-b968-5ba7b570a14a.jpg";

const NAV_ITEMS = [
  { label: "О туре", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Контакты", href: "#contacts" },
];

const PROGRAM = [
  { day: "1", title: "Старт экспедиции", desc: "Сбор группы, инструктаж, первый переход через базовый лагерь. Знакомство с командой и маршрутом.", icon: "Flag" },
  { day: "2", title: "Подъём в горы", desc: "Восхождение на первый перевал. Панорамные виды, фотостоп на вершине, ночёвка у горного озера.", icon: "Mountain" },
  { day: "3", title: "День открытий", desc: "Исследование ущелья, водопады и дикая природа. Обед у реки, вечерний костёр и рассказы гидов.", icon: "Compass" },
  { day: "4", title: "Финальный перевал", desc: "Самый живописный участок маршрута. Спуск в долину, торжественный ужин и награждение участников.", icon: "Award" },
];

const FEATURES = [
  { icon: "Users", value: "12", label: "человек в группе" },
  { icon: "Calendar", value: "4", label: "дня впечатлений" },
  { icon: "MapPin", value: "3200", label: "метров над уровнем моря" },
  { icon: "Shield", value: "100%", label: "безопасность и страховка" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#1A1A1A] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl">
        {!sent ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">Записаться на тур</h3>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-body text-white/50 mb-1.5 uppercase tracking-widest">Имя *</label>
                <input
                  required
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#FF5C2E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-white/50 mb-1.5 uppercase tracking-widest">Телефон *</label>
                <input
                  required
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#FF5C2E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-white/50 mb-1.5 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#FF5C2E] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-white/50 mb-1.5 uppercase tracking-widest">Комментарий</label>
                <textarea
                  rows={3}
                  placeholder="Вопросы, пожелания..."
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#FF5C2E] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-tour text-white font-display font-bold text-lg py-4 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity mt-2"
              >
                Отправить заявку
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-tour flex items-center justify-center mx-auto mb-5">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white uppercase mb-3">Заявка принята!</h3>
            <p className="text-white/60 font-body mb-6">Мы свяжемся с вами в течение 24 часов для подтверждения участия.</p>
            <button onClick={onClose} className="bg-white/10 text-white font-body px-8 py-3 rounded-xl hover:bg-white/20 transition-colors">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-dark py-3 shadow-lg shadow-black/30" : "py-6 bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold uppercase tracking-widest">
            <span className="text-gradient">ТУР</span><span className="text-white">ЭКСПЕДИЦИЯ</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-white/70 hover:text-white font-body font-medium text-sm uppercase tracking-widest transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-tour text-white font-display font-bold text-sm px-6 py-2.5 rounded-full uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Записаться
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-white/80 hover:text-white font-body font-medium text-base uppercase tracking-widest text-left transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
              className="bg-gradient-tour text-white font-display font-bold text-sm px-6 py-3 rounded-full uppercase tracking-wider mt-2"
            >
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0D0D0D]" />
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-tour opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#FFD23F] animate-pulse" />
            <span className="font-body text-sm text-white/90 uppercase tracking-widest">Сезон 2026 · Набор открыт</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-none mb-6 animate-fade-up" style={{ animationFillMode: "both" }}>
            <span className="text-gradient">Покори</span>
            <br />
            <span className="text-white">вершины</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200" style={{ animationFillMode: "both" }}>
            Уникальная горная экспедиция для тех, кто хочет выйти за пределы привычного
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-400" style={{ animationFillMode: "both" }}>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-tour text-white font-display font-bold text-lg px-10 py-4 rounded-full uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-orange-600/30"
            >
              Записаться на тур
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="border border-white/30 text-white font-display font-bold text-lg px-10 py-4 rounded-full uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Узнать больше
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 font-body text-xs uppercase tracking-widest">Скролл</span>
          <Icon name="ChevronDown" size={20} className="text-white/40" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1A1A1A] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => (
            <AnimatedSection key={i} className="text-center">
              <div className="text-gradient font-display text-4xl font-bold mb-1">{f.value}</div>
              <div className="text-white/50 font-body text-sm">{f.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-tour" />
              <span className="font-body text-sm text-[#FF5C2E] uppercase tracking-widest font-semibold">О туре</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-tight mb-6 text-white">
              Где начинается
              <br />
              <span className="text-gradient">настоящее</span>
              <br />
              приключение
            </h2>
            <p className="text-white/60 font-body text-lg leading-relaxed mb-6">
              Наша экспедиция — это не просто поход. Это возможность открыть в себе силы, о которых вы даже не подозревали. Опытные гиды, безопасные маршруты и незабываемые пейзажи.
            </p>
            <p className="text-white/60 font-body text-lg leading-relaxed">
              Каждый участник получает полное снаряжение, страховку, питание на всём маршруте и профессиональные фотографии с тура.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Безопасность", "Снаряжение включено", "Фото с тура", "Страховка"].map(tag => (
                <span key={tag} className="border border-white/15 text-white/70 font-body text-sm px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src={HERO_IMAGE} alt="Горный тур" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-tour flex items-center justify-center flex-shrink-0">
                  <Icon name="Star" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-lg">4.9 / 5.0</div>
                  <div className="text-white/50 font-body text-sm">Средняя оценка участников</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="py-28 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-tour" />
              <span className="font-body text-sm text-[#FF5C2E] uppercase tracking-widest font-semibold">Программа</span>
              <div className="w-8 h-0.5 bg-gradient-tour" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-white leading-tight">
              4 дня, которые
              <br />
              <span className="text-gradient">изменят всё</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {PROGRAM.map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-[#1A1A1A] border border-white/8 rounded-2xl p-7 flex gap-6 items-start hover:border-[#FF5C2E]/30 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-tour flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-600/20">
                    <Icon name={item.icon} fallback="Star" size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#FF5C2E] font-display text-sm font-bold uppercase tracking-widest">День {item.day}</span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/55 font-body leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-tour text-white font-display font-bold text-lg px-12 py-5 rounded-full uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-orange-600/30"
            >
              Хочу участвовать
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-tour" />
              <span className="font-body text-sm text-[#FF5C2E] uppercase tracking-widest font-semibold">Контакты</span>
            </div>
            <h2 className="font-display text-5xl font-bold uppercase text-white leading-tight mb-6">
              Остались
              <br />
              <span className="text-gradient">вопросы?</span>
            </h2>
            <p className="text-white/60 font-body text-lg leading-relaxed mb-10">
              Напишите нам или позвоните — ответим в течение часа и расскажем всё о туре, снаряжении и условиях.
            </p>

            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@tour-expedition.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Горная, 12" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-tour group-hover:border-transparent transition-all">
                    <Icon name={c.icon} fallback="Circle" size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white/40 font-body text-xs uppercase tracking-widest">{c.label}</div>
                    <div className="text-white font-body font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative bg-[#1A1A1A] rounded-3xl p-10 border border-white/8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF5C2E] opacity-10" style={{ filter: "blur(60px)" }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#FFD23F] opacity-8" style={{ filter: "blur(60px)" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-tour flex items-center justify-center mb-6">
                  <Icon name="Rocket" size={24} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase mb-3">Готов к старту?</h3>
                <p className="text-white/55 font-body leading-relaxed mb-8">
                  Мест в группе ограничено — всего 12 участников. Оставьте заявку прямо сейчас и получите подробную программу тура на почту.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-tour text-white font-display font-bold text-base py-4 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Записаться на тур
                </button>
                <p className="text-white/30 font-body text-xs text-center mt-4">Бесплатно и без обязательств</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold uppercase">
            <span className="text-gradient">ТУР</span><span className="text-white/60">ЭКСПЕДИЦИЯ</span>
          </span>
          <span className="text-white/30 font-body text-sm">© 2026 ТурЭкспедиция. Все права защищены.</span>
          <div className="flex gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-white/30 hover:text-white/60 font-body text-sm transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {modalOpen && <RegistrationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}