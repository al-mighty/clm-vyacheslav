# CLM Presentation · Vyacheslav Kovalev

CLM-style интерактивная презентация Senior Fullstack Engineer'а в формате Veeva detail aid.
Vue 3 (CDN, без сборки) — как принято в реальных Veeva CLM проектах.

---

## Быстрый старт

```bash
# Один раз — установить зависимости
npm install

# Dev-сервер с HMR
npm run dev          # http://localhost:5173

# Production build → dist/
npm run build

# Локальный preview собранного билда
npm run preview
```

Без сборки тоже всё работает — `index.html` это монолитный single-file
билд (Vue 3 через CDN), его можно просто открыть в браузере.

### Два режима жизни проекта

- **`index.html`** — монолитный working-build. Vite берёт его как основной
  entry, в dev-режиме отдаёт с HMR, в production бандлит в `dist/index.html`.
- **`slides/*`** — модульная структура (HTML-фрагменты). Vite копирует их в
  `dist/` как есть. Используются как основа для будущей миграции на Vue SFC.

---

## Структура проекта

```
clm-vyacheslav/
├── index.html                  # working build (single file, Vue CDN)
├── vite.config.js              # multi-page Vite + post-build copy
├── package.json                # vite в devDependencies
├── manifest.json               # Veeva CLM-совместимые метаданные
├── README.md                   # этот файл
│
├── slides/                     # отдельные слайды
│   ├── 01-cover.html
│   ├── 02-pillars.html
│   ├── 03-timeline.html
│   ├── 04-stack.html
│   ├── 05-case-domru.html
│   ├── 06-architecture.html    # interactive hot-spots
│   ├── 07-skills.html
│   └── 08-contact.html
│
├── shared/
│   ├── styles/
│   │   ├── tokens.css          # CSS-переменные (цвета, шрифты)
│   │   └── base.css            # типографика, layout-примитивы
│   ├── components/
│   │   └── nav.js              # Vue-компонент навигации
│   └── tracking/
│       └── veeva-clm.js        # обёртка над com.veeva.clm.* API
│
├── assets/
│   ├── fonts/                  # положите сюда кастомные шрифты
│   └── svg/                    # отдельные SVG-ассеты
│
└── docs/
    ├── ROADMAP.md              # что делать дальше
    └── VEEVA-INTEGRATION.md    # заметки по упаковке под Veeva
```

---

## Что уже работает

- ✅ 8 слайдов с переходами и анимациями
- ✅ Горизонтальная навигация: стрелки клавиатуры, дотами, кнопками
- ✅ Hot-spots на SVG (слайд 6) — пульсирующие точки + детальные карточки
- ✅ Раскрывающиеся карточки (слайд 2 — Three pillars)
- ✅ Анимированный таймлайн (слайд 3)
- ✅ Анимация прогресс-баров стека (слайд 4)
- ✅ Session timer и view time per slide (как в реальном Veeva CLM)
- ✅ Tracking-заглушка для интеграции с Veeva API

---

## Что доделать (по приоритету)

См. `docs/ROADMAP.md` — там расписаны следующие шаги:

1. **Real Veeva tracking** — заменить заглушку в `shared/tracking/veeva-clm.js` на реальные вызовы `com.veeva.clm.createRecord` и `com.veeva.clm.getDataForCurrentObject`
2. **Build system** — добавить Vite для нормальной сборки модульной версии в production-bundle
3. **Адаптив** — сейчас фиксированная вёрстка под 1024×768 (стандарт iPad). Доработать для разных размеров iPad Pro
4. **Контент-меню** — overview-слайд со всеми тайлами для быстрой навигации (типичная фишка Veeva CLM)
5. **i18n** — сейчас mix EN/RU. Если для продакшна — определиться с одним языком

---

## Запуск

См. раздел «Быстрый старт» выше — `npm install && npm run dev`. Если node/npm
недоступны (или нужно показать презентацию вне разработки), `index.html`
открывается напрямую в браузере без сборки.

---

## Управление

- **→** или клик на правую стрелку — следующий слайд
- **←** или клик на левую стрелку — предыдущий слайд
- Клик на дот внизу — переход на конкретный слайд
- Клик на хот-споты на слайде 6 — раскрытие деталей

---

## Стек

- **Vue 3** (Composition API, через CDN)
- **CSS Variables** для дизайн-токенов
- **Google Fonts**: Fraunces (display) + JetBrains Mono (mono)
- **No build step** — единственное требование: интернет для CDN

Для production под Veeva можно либо:
- inline'ить Vue в `index.html` (Veeva принимает offline-bundle)
- собрать через Vite в `dist/` и упаковать в zip по структуре Veeva

См. `docs/VEEVA-INTEGRATION.md`.

---

## Контакты

Vyacheslav Kovalev · dev.vyacheslav@gmail.com · @es_kanor
