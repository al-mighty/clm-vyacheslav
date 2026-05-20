// Shared Yandex Metrika loader for all cheslav.space projects.
// Include once per project:
//   <script async src="https://cheslav.space/metrika.js"></script>
//
// Single counter id 109033343 — Metrika treats each project's pages
// as paths under cheslav.space (e.g. /linkpulse/, /pharma-rag/, /survivors/),
// so reports aggregate naturally.
(function (m, e, t, r, i, k, a) {
  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
  m[i].l = 1 * new Date();
  for (var j = 0; j < e.scripts.length; j++) {
    if (e.scripts[j].src === r) return;
  }
  k = e.createElement(t); a = e.getElementsByTagName(t)[0];
  k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=109033343', 'ym');

window.ym(109033343, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: 'dataLayer',
  accurateTrackBounce: true,
  trackLinks: true,
});
