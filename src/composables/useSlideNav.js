import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSwipe } from './useSwipe.js';
import { useVeevaTracking } from './useVeevaTracking.js';
import { SLIDE_NAMES, TIMELINE_SLUGS } from '@/config/slides.js';

function slideFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return 0;
  // Deep link: timeline/slug
  if (hash.startsWith('timeline/')) return SLIDE_NAMES.indexOf('timeline');
  const idx = SLIDE_NAMES.indexOf(hash);
  if (idx !== -1) return idx;
  const num = parseInt(hash, 10);
  if (!isNaN(num) && num >= 1 && num <= SLIDE_NAMES.length) return num - 1;
  return 0;
}

function timelineItemFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash.startsWith('timeline/')) return null;
  const slug = hash.split('/')[1];
  const idx = TIMELINE_SLUGS.indexOf(slug);
  return idx !== -1 ? idx : null;
}

export function useSlideNav(totalSlides) {
  const current = ref(slideFromHash());
  const slideEnter = ref(Date.now());
  const sessionStart = Date.now();
  const sessionTime = ref('00:00');
  const slideViewTime = ref(0);
  const tracking = useVeevaTracking();

  const isFirst = computed(() => current.value === 0);
  const isLast = computed(() => current.value === totalSlides - 1);

  const autoplay = ref(false);
  const autoplayProgress = ref(0); // 0..1
  let autoplayTimer = null;
  let progressTimer = null;
  let autoplayStartTimer = null;
  const AUTOPLAY_INTERVAL = 5000;

  function vibrate() {
    if (navigator.vibrate) navigator.vibrate(15);
  }

  function next() {
    if (current.value < totalSlides - 1) { current.value++; vibrate(); }
  }

  function prev() {
    if (current.value > 0) { current.value--; vibrate(); }
  }

  function stopAutoplay() {
    autoplay.value = false;
    autoplayProgress.value = 0;
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    // Also cancel the deferred start scheduled on mount — without this
    // the user could swipe in the first 2 seconds, and the pending
    // setTimeout would still fire and yank them forward another slide.
    clearTimeout(autoplayStartTimer);
    autoplayTimer = null;
    progressTimer = null;
    autoplayStartTimer = null;
  }

  function startProgressBar() {
    const step = 50; // ms
    autoplayProgress.value = 0;
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      autoplayProgress.value = Math.min(autoplayProgress.value + step / AUTOPLAY_INTERVAL, 1);
    }, step);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplay.value = true;
    next();
    startProgressBar();
    autoplayTimer = setInterval(() => {
      if (current.value >= totalSlides - 1) { stopAutoplay(); return; }
      next();
      startProgressBar();
    }, AUTOPLAY_INTERVAL);
  }

  function goTo(i) {
    stopAutoplay();
    if (i >= 0 && i < totalSlides) current.value = i;
  }

  // Keyboard — stops autoplay on manual input
  function onKey(e) {
    if (e.key === 'ArrowRight') { stopAutoplay(); next(); }
    if (e.key === 'ArrowLeft') { stopAutoplay(); prev(); }
  }

  // Touch swipe — stops autoplay
  useSwipe(
    () => { stopAutoplay(); next(); },
    () => { stopAutoplay(); prev(); },
  );

  // Wheel scroll navigation. Trackpads emit an inertia tail of ~1.5s after
  // a single swipe; a fixed-duration lock isn't enough — it unlocks while
  // the tail is still arriving and the user sails through extra slides.
  // Instead, fire once, then require ~250ms of *silence* (no wheel event)
  // before accepting the next one.
  let wheelArmed = true;
  let wheelQuietTimer = null;
  function onWheel(e) {
    const delta = e.deltaY || e.detail;
    if (Math.abs(delta) < 30) return;
    // Any wheel event resets the quiet window — only after the user
    // truly stops scrolling do we re-arm.
    clearTimeout(wheelQuietTimer);
    wheelQuietTimer = setTimeout(() => { wheelArmed = true; }, 250);
    if (!wheelArmed) return;
    wheelArmed = false;
    stopAutoplay();
    if (delta > 0) next();
    else prev();
  }

  // Timer
  let timer = null;
  onMounted(() => {
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    // Auto-start slideshow if landing on cover. Guard inside the timer:
    // the user may swipe/click/scroll during the 2s delay, and we don't
    // want to override their intent by starting autoplay on whatever
    // slide they navigated to.
    if (current.value === 0) {
      autoplayStartTimer = setTimeout(() => {
        autoplayStartTimer = null;
        if (current.value === 0) startAutoplay();
      }, 2000);
    }
    timer = setInterval(() => {
      const totalSec = Math.floor((Date.now() - sessionStart) / 1000);
      const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
      const s = String(totalSec % 60).padStart(2, '0');
      sessionTime.value = `${m}:${s}`;
      slideViewTime.value = Math.floor((Date.now() - slideEnter.value) / 1000);
    }, 1000);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('wheel', onWheel);
    clearInterval(timer);
    clearTimeout(wheelQuietTimer);
    stopAutoplay();
  });

  watch(current, (newVal, oldVal) => {
    const exitTime = Math.floor((Date.now() - slideEnter.value) / 1000);
    tracking.slideExit(`slide-${oldVal}`, exitTime);
    tracking.slideView(`slide-${newVal}`, `Slide ${newVal + 1}`);
    slideEnter.value = Date.now();
    slideViewTime.value = 0;
    const slug = SLIDE_NAMES[newVal] || String(newVal + 1);
    history.replaceState(null, '', `#${slug}`);
    // Yandex Metrika pageview. The shared loader has ssr:true (no auto-
    // hit), so each slide change has to ping explicitly. Hash routes
    // matter for Metrika's "page" reports because we change history.
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(109033343, 'hit', location.pathname + '#' + slug);
    }
  });

  // Initial pageview for the first slide. `watch` only fires on changes,
  // so without this the very first slide never gets a hit. ym may not be
  // loaded yet — the queue stub on window.ym swallows it safely.
  if (typeof window !== 'undefined') {
    const initialSlug = SLIDE_NAMES[current.value] || String(current.value + 1);
    const fireInitial = () => {
      if (typeof window.ym === 'function') {
        window.ym(109033343, 'hit', location.pathname + '#' + initialSlug);
      }
    };
    // Give the metrika.js loader a tick to attach the stub.
    setTimeout(fireInitial, 0);
  }

  return {
    current,
    isFirst,
    isLast,
    sessionTime,
    slideViewTime,
    next,
    prev,
    goTo,
    startAutoplay,
    stopAutoplay,
    autoplay,
    autoplayProgress,
    tracking,
    initialTimelineItem: timelineItemFromHash(),
    TIMELINE_SLUGS,
  };
}
