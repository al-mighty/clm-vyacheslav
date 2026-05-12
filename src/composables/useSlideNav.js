import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSwipe } from './useSwipe.js';
import { useVeevaTracking } from './useVeevaTracking.js';

const SLIDE_NAMES = ['cover', 'overview', 'pillars', 'timeline', 'stack', 'case', 'architecture', 'skills', 'demos', 'contact'];

function slideFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return 0;
  const idx = SLIDE_NAMES.indexOf(hash);
  if (idx !== -1) return idx;
  const num = parseInt(hash, 10);
  if (!isNaN(num) && num >= 1 && num <= SLIDE_NAMES.length) return num - 1;
  return 0;
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
    autoplayTimer = null;
    progressTimer = null;
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

  // Wheel scroll navigation (debounced)
  let wheelLocked = false;
  function onWheel(e) {
    if (wheelLocked) return;
    const delta = e.deltaY || e.detail;
    if (Math.abs(delta) < 30) return;
    wheelLocked = true;
    stopAutoplay();
    if (delta > 0) next();
    else prev();
    setTimeout(() => { wheelLocked = false; }, 600);
  }

  // Timer
  let timer = null;
  onMounted(() => {
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    // Auto-start slideshow if landing on cover
    if (current.value === 0) {
      setTimeout(() => startAutoplay(), 2000);
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
    stopAutoplay();
  });

  watch(current, (newVal, oldVal) => {
    const exitTime = Math.floor((Date.now() - slideEnter.value) / 1000);
    tracking.slideExit(`slide-${oldVal}`, exitTime);
    tracking.slideView(`slide-${newVal}`, `Slide ${newVal + 1}`);
    slideEnter.value = Date.now();
    slideViewTime.value = 0;
    history.replaceState(null, '', `#${SLIDE_NAMES[newVal] || newVal + 1}`);
  });

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
  };
}
