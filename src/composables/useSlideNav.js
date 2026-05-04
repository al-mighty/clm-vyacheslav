import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useSwipe } from './useSwipe.js';
import { useVeevaTracking } from './useVeevaTracking.js';

export function useSlideNav(totalSlides) {
  const current = ref(0);
  const slideEnter = ref(Date.now());
  const sessionStart = Date.now();
  const sessionTime = ref('00:00');
  const slideViewTime = ref(0);
  const tracking = useVeevaTracking();

  const isFirst = computed(() => current.value === 0);
  const isLast = computed(() => current.value === totalSlides - 1);

  function next() {
    if (current.value < totalSlides - 1) current.value++;
  }

  function prev() {
    if (current.value > 0) current.value--;
  }

  function goTo(i) {
    if (i >= 0 && i < totalSlides) current.value = i;
  }

  // Keyboard
  function onKey(e) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  // Touch swipe
  useSwipe(next, prev);

  // Wheel scroll navigation (debounced)
  let wheelLocked = false;
  function onWheel(e) {
    if (wheelLocked) return;
    const delta = e.deltaY || e.detail;
    if (Math.abs(delta) < 30) return;
    wheelLocked = true;
    if (delta > 0) next();
    else prev();
    setTimeout(() => { wheelLocked = false; }, 600);
  }

  // Timer
  let timer = null;
  onMounted(() => {
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
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
  });

  watch(current, (newVal, oldVal) => {
    const exitTime = Math.floor((Date.now() - slideEnter.value) / 1000);
    tracking.slideExit(`slide-${oldVal}`, exitTime);
    tracking.slideView(`slide-${newVal}`, `Slide ${newVal + 1}`);
    slideEnter.value = Date.now();
    slideViewTime.value = 0;
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
    tracking,
  };
}
