# Veeva CLM Integration Notes

Заметки по тому, как этот проект становится реальным Veeva CLM detail aid'ом.

## Структура Veeva CLM

Veeva CLM презентация — это zip-архив с конкретной структурой, который загружается в Veeva Vault → CRM. На iPad она открывается внутри Veeva CRM приложения, в WebView.

Минимальный формат:

```
my-clm.zip
├── shared/                    # общий код, доступен всем презентациям
│   ├── js/
│   ├── css/
│   └── fonts/
├── slides/
│   ├── slide-01/
│   │   ├── index.html         # обязательно index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── slide-02/
│   └── ...
└── thumbnail.png              # превью презентации
```

Каждый слайд — **отдельный HTML-файл** с собственным контекстом. Между слайдами Veeva navigation бар сверху/снизу, а контент рендерится в iframe.

## Trackable Events

Veeva трекает только то, что вы отправите через `com.veeva.clm.createRecord`. Стандартные события:

- **Slide entry / exit** — при входе и выходе со слайда
- **Hotspot interaction** — клик на хот-споты
- **Video play / pause / complete** — для встроенных видео
- **Custom actions** — что угодно бизнес-специфичное

В нашем `shared/tracking/veeva-clm.js` уже структурирован враппер.

## Ограничения Veeva

1. **Offline-first** — на iPad всё должно работать без сети. Никаких CDN для шрифтов/скриптов.
2. **WebKit only** — Veeva использует UIWebView/WKWebView. Тестировать только в Safari.
3. **Limited storage** — нельзя хранить большие данные. Презентация — статичные ассеты + минимум state в памяти.
4. **No third-party scripts** — Google Analytics, Hotjar и т.п. блокируются.
5. **Sandbox** — нет доступа к камере, файловой системе, геолокации (есть workaround через bridge).

## Отличия от обычного веб-проекта

| Что | Обычный веб | Veeva CLM |
|---|---|---|
| Шрифты | Google Fonts CDN | Локальные .woff2 |
| Vue/React | npm + bundle | inline или локально |
| Routing | history API | Veeva navigation API |
| Tracking | GA4 / Mixpanel | `com.veeva.clm.createRecord` |
| Analytics дашборд | свой | Veeva CRM reports |
| Дистрибуция | хостинг | zip → Veeva Vault |

## Пайплайн доставки

```
Разработка локально (этот проект)
        ↓
Build / pack под Veeva-структуру
        ↓
Upload в Veeva Vault
        ↓
Approval workflow (медицинские эксперты, MLR-review)
        ↓
Sync на iPad'ы медицинских представителей
        ↓
Использование на визитах к врачам
```

Шаги 4-5 — это уже задача фарм-компании, не разработчика.

## Полезные ссылки

- [Veeva Developer Portal](https://developer.veevavault.com/) (часть документации публичная, часть — за партнёрским договором)
- Veeva Engage — десктоп-версия для удалённых визитов, использует ту же CLM-презентацию
- Veeva Approved Email — отдельный формат, но похожие принципы upload в Vault

## Что специфично для агентств (Vivanti, Onpoint, Kemistry, Patiss)

Они в основном:
- **MLR-compliant контент** — каждое заявление о препарате должно иметь ссылку на источник (RCT, FDA approval letter и т.п.)
- **Animation-heavy** — GSAP, Lottie, иногда Three.js для 3D-молекул
- **Brand-strict** — всегда работают по гайдам фарм-бренда (нельзя свободно креативить)
- **Локализация** — одна презентация → 10-15 языков → 10-15 zip-архивов

Эта презентация-портфолио сделана **не под MLR**, поэтому использовать её для отправки в Kemistry как пример «работы для фармы» нельзя. Это **демонстрация владения CLM-форматом**, не более.
