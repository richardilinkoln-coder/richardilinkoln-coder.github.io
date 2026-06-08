import { useState, useEffect, useRef } from "react";

const rules = [
  {
    id: 1,
    emoji: "🚷",
    title: "Оскорбления",
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/40",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    items: [
      {
        num: "1.1",
        text: "Лёгкое оскорбление / в шуточной форме — разрешено.",
        note: "Злоупотреблять запрещено. Оскорбление администрации — запрещено (если только сам админ не против).",
        type: "allowed",
      },
      {
        num: "1.2",
        text: "Буллинг",
        punishment: "Мут 2 часа",
        type: "warn",
      },
      {
        num: "1.2",
        text: "Общее оскорбление",
        punishment: "Мут 1 час",
        type: "warn",
      },
      {
        num: "1.2",
        text: "Оскорбление родственников",
        punishment: "1 варн + мут 20 часов",
        type: "danger",
      },
    ],
  },
  {
    id: 2,
    emoji: "🫣",
    title: "Религия, нации и изображения",
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/40",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    items: [
      {
        num: "2.1",
        text: "Оскорбление религии",
        punishment: "1 варн + мут 3 часа",
        type: "danger",
      },
      {
        num: "2.2",
        text: "Расизм и национализм",
        punishment: "1 варн + мут 3 часа",
        type: "danger",
      },
      {
        num: "2.3",
        text: "Неприемлемые изображения (нацистская символика, откровенный контент)",
        punishment: "Мут 2 часа",
        type: "warn",
      },
    ],
  },
  {
    id: 3,
    emoji: "💀",
    title: "Угрозы",
    color: "from-red-600 to-rose-700",
    glow: "shadow-red-500/40",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    items: [
      {
        num: "3.1",
        text: "Любые угрозы",
        punishment: "Мут 2 часа",
        type: "warn",
      },
      {
        num: "3.2",
        text: "Угрозы доксом / сливом личных данных",
        punishment: "⛔ Перманентный бан",
        type: "ban",
      },
    ],
  },
  {
    id: 4,
    emoji: "🗣👺",
    title: "Розжиг конфликта",
    color: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/40",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    items: [
      {
        num: "4.1",
        text: "Разжигание конфликта, провокации",
        punishment: "Мут 20 минут",
        type: "warn",
      },
    ],
  },
  {
    id: 5,
    emoji: "📩",
    title: "Спам сообщениями",
    color: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/40",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    items: [
      {
        num: "5.1",
        text: "Обычный флуд — первый раз",
        punishment: "Мут 30 минут",
        type: "warn",
      },
      {
        num: "5.1",
        text: "Обычный флуд — повтор",
        punishment: "1 варн + мут 30 минут",
        type: "danger",
      },
      {
        num: "5.2",
        text: "Спам командами бота",
        punishment: "Мут 30 минут",
        type: "warn",
      },
      {
        num: "5.3",
        text: "Спам реакциями (более 7 за 10 минут) — первый раз",
        punishment: "1 варн + мут 20 минут",
        type: "danger",
      },
    ],
  },
  {
    id: 6,
    emoji: "🤖",
    title: "Запрещённый контент и мошенничество",
    color: "from-purple-500 to-violet-600",
    glow: "shadow-purple-500/40",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    items: [
      {
        num: "6.1",
        text: "18+ материалы",
        punishment: "1 варн + мут 2 часа",
        type: "danger",
      },
      {
        num: "6.1.1",
        text: "Стикеры-переходники / 18+ ссылки",
        punishment: "1 варн + мут 2 часа",
        type: "danger",
      },
      {
        num: "6.2",
        text: "Скам-ссылки (фишинг, обманные сайты)",
        punishment: "⛔ Перманентный бан",
        type: "ban",
      },
      {
        num: "6.3",
        text: "Распространение фейков — первый раз",
        punishment: "Мут 2 часа",
        type: "warn",
      },
      {
        num: "6.3",
        text: "Распространение фейков — повтор",
        punishment: "2 варна + мут 3 часа",
        type: "danger",
      },
    ],
  },
  {
    id: 7,
    emoji: "🤡",
    title: "Организованные нарушения",
    color: "from-fuchsia-500 to-pink-600",
    glow: "shadow-fuchsia-500/40",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/10",
    items: [
      {
        num: "7.1",
        text: "Рейды (флуд, троллинг группой)",
        punishment: "3 варна + бан 4 дня",
        type: "ban",
      },
    ],
  },
  {
    id: 9,
    emoji: "🔞",
    title: "Обсуждение запрещённых тем",
    color: "from-red-700 to-rose-800",
    glow: "shadow-red-700/40",
    border: "border-red-700/30",
    bg: "bg-red-700/10",
    items: [
      {
        num: "9.1",
        text: "Пропаганда насилия / терроризма",
        punishment: "⛔ Перманентный бан",
        type: "ban",
      },
      {
        num: "9.2",
        text: "Пропаганда ЛГБТ",
        punishment: "1 варн + мут 3 часа",
        type: "danger",
      },
      {
        num: "9.3",
        text: "Реклама в любом виде",
        punishment: "⛔ Перманентный бан",
        type: "ban",
      },
    ],
  },
  {
    id: 10,
    emoji: "👾",
    title: "Злоупотребление правилами",
    color: "from-teal-500 to-cyan-600",
    glow: "shadow-teal-500/40",
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    items: [
      {
        num: "10.1",
        text: "Использование лазеек в правилах",
        punishment: "1 варн + мут 1 час",
        type: "danger",
      },
      {
        num: "10.2",
        text: "Обход наказания — твинк-аккаунт",
        punishment: "⛔ Перманентный бан аккаунта",
        type: "ban",
      },
      {
        num: "10.2",
        text: "Обход наказания — основной аккаунт",
        punishment: "Мут +5 часов + 1 варн",
        type: "danger",
      },
      {
        num: "10.3",
        text: 'Команды "комар", "комару", "манки" в общий чат',
        punishment: "Мут 10 минут",
        type: "warn",
      },
      {
        num: "10.4",
        text: "Сообщения не по теме в тематических разделах (оффтоп)",
        punishment: "Мут 10 минут",
        type: "warn",
      },
    ],
  },
];

const punishmentColors: Record<string, string> = {
  allowed: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
  warn: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
  danger: "bg-orange-500/20 text-orange-300 border border-orange-500/40",
  ban: "bg-red-500/20 text-red-300 border border-red-500/40",
};

const punishmentIcon: Record<string, string> = {
  allowed: "✅",
  warn: "⚠️",
  danger: "🔶",
  ban: "🚫",
};

// Floating particles component
function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}



function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StatBadge({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-indigo-500/40"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-2xl font-black text-white">{value}</span>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}

function BackToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      ↑
    </button>
  );
}

function LegendItem({
  type,
  label,
}: {
  type: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span>{punishmentIcon[type]}</span>
      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${punishmentColors[type]}`}
      >
        {label}
      </span>
    </div>
  );
}

export default function App() {
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandKey, setExpandKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredRules = rules.filter(
    (r) =>
      searchQuery === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.items.some(
        (item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ("punishment" in item &&
            item.punishment
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
  );

  const totalRules = rules.reduce((acc, r) => acc + r.items.length, 0);
  const banRules = rules.reduce(
    (acc, r) => acc + r.items.filter((i) => i.type === "ban").length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <ScrollProgress />
      <GridBackground />
      <Particles />
      <BackToTopButton />

      {/* Hero Section */}
      <div className="relative z-10 px-4 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-sm font-medium mb-6 transition-all duration-700"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Telegram Chat • Правила сообщества
          </div>

          {/* Main title */}
          <h1
            className="text-5xl md:text-7xl font-black mb-4 transition-all duration-700 delay-100"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              background:
                "linear-gradient(135deg, #a5b4fc 0%, #818cf8 30%, #c084fc 60%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            📋 Правила чата
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 transition-all duration-700 delay-200"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            Привет! Чтобы в чате было комфортно для всех, тут небольшой свод
            правил. Мы{" "}
            <span className="text-pink-400 font-semibold">доверяем тебе</span>{" "}
            ❤️
          </p>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8 transition-all duration-700 delay-300"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <StatBadge icon="📚" label="Разделов" value={String(rules.length)} />
            <StatBadge icon="📌" label="Правил" value={String(totalRules)} />
            <StatBadge icon="🚫" label="Банов" value={String(banRules)} />
          </div>

          {/* Search */}
          <div
            className="relative max-w-md mx-auto mb-6 transition-all duration-700 delay-400"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по правилам..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all duration-200 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-4 transition-all duration-700 delay-500"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <button
              onClick={() => {
                setAllExpanded(!allExpanded);
                setExpandKey((k) => k + 1);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {allExpanded ? "🗂 Свернуть все" : "📖 Раскрыть все"}
            </button>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ✈️ Открыть чат
            </a>
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-600"
            style={{
              opacity: headerVisible ? 1 : 0,
            }}
          >
            <LegendItem type="allowed" label="Разрешено" />
            <LegendItem type="warn" label="Предупреждение" />
            <LegendItem type="danger" label="Варн + мут" />
            <LegendItem type="ban" label="Бан" />
          </div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {searchQuery && filteredRules.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">
                Ничего не найдено по запросу «{searchQuery}»
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-indigo-400 hover:text-indigo-300 underline text-sm transition-colors"
              >
                Сбросить поиск
              </button>
            </div>
          )}
          <div className="space-y-4">
            {filteredRules.map((rule, i) => (
              <ExpandableRuleCard
                key={`${rule.id}-${expandKey}`}
                rule={rule}
                index={i}
                forceExpanded={allExpanded}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 py-10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>🛡️</span>
              <span>Администрация оставляет за собой право менять правила</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Правила чата • Сделано с ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

// Separate controlled component for expand/collapse with force prop
function ExpandableRuleCard({
  rule,
  index,
  forceExpanded,
}: {
  rule: (typeof rules)[0];
  index: number;
  forceExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(forceExpanded);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpanded(forceExpanded);
  }, [forceExpanded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div
        className={`relative rounded-2xl border ${rule.border} ${rule.bg} backdrop-blur-sm cursor-pointer transition-all duration-300 overflow-hidden group`}
        style={{
          boxShadow: hovered ? `0 8px 40px 0 rgba(99,102,241,0.2)` : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />

        {/* Glow line top */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${rule.color} opacity-60`}
        />

        {/* Header */}
        <div className="flex items-center gap-4 p-5">
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${rule.color} flex items-center justify-center text-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            {rule.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${rule.color} text-white shadow-sm`}
              >
                §{rule.id}
              </span>
              <span className="text-xs text-gray-500">
                {rule.items.length}{" "}
                {rule.items.length === 1
                  ? "пункт"
                  : rule.items.length <= 4
                    ? "пункта"
                    : "пунктов"}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {rule.title}
            </h3>
          </div>
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${expanded ? "rotate-180 bg-white/10" : ""}`}
          >
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Divider */}
        {expanded && (
          <div
            className={`mx-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent`}
          />
        )}

        {/* Content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? "2000px" : "0px" }}
        >
          <div className="px-5 pb-5 pt-4 space-y-2.5">
            {rule.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/20 border border-white/5 hover:bg-black/30 hover:border-white/10 transition-all duration-200"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5 leading-none">
                  {punishmentIcon[item.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="text-xs text-gray-600 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                      {item.num}
                    </span>
                    <span className="text-gray-200 text-sm leading-snug">
                      {item.text}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-gray-500 text-xs mt-1.5 italic leading-relaxed bg-white/5 rounded-lg px-2.5 py-2">
                      💬 {item.note}
                    </p>
                  )}
                  {"punishment" in item && item.punishment && (
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${punishmentColors[item.type]}`}
                      >
                        <span>🔨</span>
                        {item.punishment}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
