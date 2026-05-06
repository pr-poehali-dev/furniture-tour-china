import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2ca4c4f-6481-4d25-9503-c3b1746f8503/files/fc7bad79-7f2b-4126-8e49-e01f3016a6b9.jpg";

const NAV_ITEMS = [
  { label: "О туре", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Контакты", href: "#contacts" },
];

const PROGRAM = [
  { day: "1", title: "Прилёт и заселение", desc: "Прилёт, заселение в гостиницу, знакомство с гидом.", icon: "Plane" },
  { day: "2", title: "Шоу-румы и выставки", desc: "Посещение шоу-румов и выставок мебели.", icon: "Building2" },
  { day: "3", title: "Шоу-румы", desc: "Посещение шоу-румов.", icon: "Store" },
  { day: "4", title: "Выставки", desc: "Посещение выставок.", icon: "LayoutGrid" },
  { day: "5", title: "Документы и закупка", desc: "Оформление документов, закупка товара.", icon: "FileCheck" },
  { day: "6", title: "Экскурсионная программа", desc: "Экскурсионная программа (оплачивается отдельно).", icon: "Map" },
  { day: "7", title: "Выселение и трансфер", desc: "Выселение, трансфер в аэропорт.", icon: "LogOut" },
];

const FEATURES = [
  { icon: "Calendar", value: "7", label: "дней в Китае" },
  { icon: "Store", value: "50+", label: "фабрик и шоурумов" },
  { icon: "Shield", value: "100%", label: "поддержка байера и переводчика" },
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
      <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-[#1A56DB]/15 shadow-2xl">
        {!sent ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold text-[#1E3A5F] uppercase tracking-wide">Записаться на тур</h3>
              <button onClick={onClose} className="text-[#1E3A5F]/40 hover:text-[#1E3A5F] transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-body text-[#1E3A5F]/50 mb-1.5 uppercase tracking-widest">Имя *</label>
                <input
                  required
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-blue-50 border border-[#1A56DB]/20 rounded-xl px-4 py-3 text-[#1E3A5F] font-body placeholder:text-[#1E3A5F]/30 focus:outline-none focus:border-[#1A56DB] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-[#1E3A5F]/50 mb-1.5 uppercase tracking-widest">Телефон *</label>
                <input
                  required
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-blue-50 border border-[#1A56DB]/20 rounded-xl px-4 py-3 text-[#1E3A5F] font-body placeholder:text-[#1E3A5F]/30 focus:outline-none focus:border-[#1A56DB] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-[#1E3A5F]/50 mb-1.5 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-blue-50 border border-[#1A56DB]/20 rounded-xl px-4 py-3 text-[#1E3A5F] font-body placeholder:text-[#1E3A5F]/30 focus:outline-none focus:border-[#1A56DB] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-[#1E3A5F]/50 mb-1.5 uppercase tracking-widest">Комментарий</label>
                <textarea
                  rows={3}
                  placeholder="Вопросы, пожелания..."
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-blue-50 border border-[#1A56DB]/20 rounded-xl px-4 py-3 text-[#1E3A5F] font-body placeholder:text-[#1E3A5F]/30 focus:outline-none focus:border-[#1A56DB] transition-colors resize-none"
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
            <h3 className="font-display text-2xl font-bold text-[#1E3A5F] uppercase mb-3">Заявка принята!</h3>
            <p className="text-[#1E3A5F]/60 font-body mb-6">Мы свяжемся с вами в течение 24 часов для подтверждения участия.</p>
            <button onClick={onClose} className="bg-blue-50 text-[#1A56DB] font-body px-8 py-3 rounded-xl hover:bg-blue-100 transition-colors">
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
    <div className="bg-[#F0F6FF] min-h-screen text-[#1E3A5F] overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-dark py-3 shadow-lg shadow-black/30" : "py-6 bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold uppercase tracking-widest">
            <span className="text-gradient">КРАС</span><span className="text-[#1E3A5F]">ЭКСПРЕСС</span>
          </a>

          <div className="hidden md:flex items-center gap-3">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="bg-[#EAF2FF] text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white font-body font-semibold text-sm px-5 py-2 rounded-full uppercase tracking-wider transition-all border border-[#1A56DB]/20 hover:border-[#1A56DB]"
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

          <button className="md:hidden text-[#1E3A5F]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="bg-[#EAF2FF] text-[#1A56DB] font-body font-semibold text-sm px-5 py-3 rounded-xl uppercase tracking-wider text-left hover:bg-[#1A56DB] hover:text-white transition-all"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/70 via-[#1A56DB]/40 to-[#F0F6FF]" />
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-tour opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
            <span className="font-body text-sm text-white/90 uppercase tracking-widest">Китай 2026 · Набор открыт</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-none mb-6 animate-fade-up" style={{ animationFillMode: "both" }}>
            <span className="text-gradient">Мебельный</span>
            <br />
            <span className="text-white drop-shadow-lg">тур в Китай</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200" style={{ animationFillMode: "both" }}>
            Закупочный тур на мебельные фабрики Гуанчжоу и Фошань — с байером, переводчиком и полным сопровождением
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
              className="border border-white/50 text-white font-display font-bold text-lg px-10 py-4 rounded-full uppercase tracking-wider hover:bg-white/20 transition-colors"
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
      <section className="bg-white border-y border-[#1A56DB]/10">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <AnimatedSection key={i} className="text-center">
              <div className="text-gradient font-display text-4xl font-bold mb-1">{f.value}</div>
              <div className="text-[#1E3A5F]/60 font-body text-sm">{f.label}</div>
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
              <span className="font-body text-sm text-[#1A56DB] uppercase tracking-widest font-semibold">О туре</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-tight mb-6 text-[#1E3A5F]">
              Прямые закупки
              <br />
              <span className="text-gradient">без посредников</span>
              <br />
              из Китая
            </h2>
            <p className="text-[#1E3A5F]/65 font-body text-lg leading-relaxed mb-6">
              Мы организуем полный цикл закупочного тура: от перелёта до оформления заказа на фабрике. Вы работаете напрямую с производителями Фошань и Гуанчжоу — крупнейших мебельных центров мира.
            </p>
            <p className="text-[#1E3A5F]/65 font-body text-lg leading-relaxed">
              В стоимость включены: проживание, трансферы, профессиональный байер, переводчик на всех переговорах и помощь с логистикой доставки в Россию.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Байер включён", "Переводчик", "Проживание", "Логистика в РФ"].map(tag => (
                <span key={tag} className="border border-[#1A56DB]/25 text-[#1A56DB] font-body text-sm px-4 py-2 rounded-full bg-blue-50">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src={HERO_IMAGE} alt="Мебельный тур в Китай" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-tour flex items-center justify-center flex-shrink-0">
                  <Icon name="Star" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-[#1E3A5F] text-lg">4.9 / 5.0</div>
                  <div className="text-[#1E3A5F]/60 font-body text-sm">Средняя оценка наших туристов</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-tour" />
              <span className="font-body text-sm text-[#1A56DB] uppercase tracking-widest font-semibold">Программа</span>
              <div className="w-8 h-0.5 bg-gradient-tour" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-[#1E3A5F] leading-tight">
              7 дней в Китае —
              <br />
              <span className="text-gradient">полная программа</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {PROGRAM.map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-[#F0F6FF] border border-[#1A56DB]/12 rounded-2xl p-7 flex gap-6 items-start hover:border-[#1A56DB]/40 hover:shadow-md transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-tour flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                    <Icon name={item.icon} fallback="Star" size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#1A56DB] font-display text-sm font-bold uppercase tracking-widest">День {item.day} из 7</span>
                    <h3 className="font-display text-2xl font-bold text-[#1E3A5F] uppercase mt-1 mb-2">{item.title}</h3>
                    <p className="text-[#1E3A5F]/60 font-body leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-tour text-white font-display font-bold text-lg px-12 py-5 rounded-full uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-blue-600/30"
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
              <span className="font-body text-sm text-[#1A56DB] uppercase tracking-widest font-semibold">Контакты</span>
            </div>
            <h2 className="font-display text-5xl font-bold uppercase text-[#1E3A5F] leading-tight mb-6">
              Остались
              <br />
              <span className="text-gradient">вопросы?</span>
            </h2>
            <p className="text-[#1E3A5F]/65 font-body text-lg leading-relaxed mb-10">
              Напишите нам или позвоните — ответим в течение часа и расскажем всё о туре, условиях участия и стоимости.
            </p>

            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "8-923-811-10-00" },
                { icon: "Mail", label: "Email", value: "krasexpress@mail.ru" },
                { icon: "MapPin", label: "Адрес", value: "г. Красноярск, ул. Вавилова 2А/18" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-[#1A56DB]/15 flex items-center justify-center group-hover:bg-gradient-tour group-hover:border-transparent transition-all">
                    <Icon name={c.icon} fallback="Circle" size={18} className="text-[#1A56DB] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[#1E3A5F]/45 font-body text-xs uppercase tracking-widest">{c.label}</div>
                    <div className="text-[#1E3A5F] font-body font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-[#1A56DB] to-[#1E3A5F] rounded-3xl p-10 border border-blue-400/20 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#60A5FA] opacity-20" style={{ filter: "blur(60px)" }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white opacity-10" style={{ filter: "blur(60px)" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Icon name="Rocket" size={24} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase mb-3">Готовы лететь?</h3>
                <p className="text-white/75 font-body leading-relaxed mb-8">
                  Мест в группе ограничено — всего 8 участников. Оставьте заявку прямо сейчас и получите подробную программу тура на почту.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-tour text-white font-display font-bold text-base py-4 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Записаться на тур
                </button>
                <p className="text-white/50 font-body text-xs text-center mt-4">Бесплатно и без обязательств</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1A56DB]/10 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold uppercase">
            <span className="text-gradient">КРАС</span><span className="text-[#1E3A5F]/60">ЭКСПРЕСС</span>
          </span>
          <span className="text-[#1E3A5F]/35 font-body text-sm">© 2026 Крас Экспресс. Все права защищены.</span>
          <div className="flex gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-[#1E3A5F]/40 hover:text-[#1A56DB] font-body text-sm transition-colors"
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