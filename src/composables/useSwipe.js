import { onMounted, onUnmounted } from 'vue';

export function useSwipe(onLeft, onRight, { minDistance = 60 } = {}) {
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  const onTouchStart = (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
    startTime = Date.now();
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const dt = Date.now() - startTime;

    // Only accept clearly horizontal, fast gestures. Vertical movement
    // means the user is trying to scroll the page — never swap slides on
    // it. The 1.5× ratio rejects diagonals, and the 500ms cap rejects
    // slow drags (text selection, accidental long-press scrolls).
    if (dt > 500) return;
    if (absDx < minDistance) return;
    if (absDx < absDy * 1.5) return;

    dx < 0 ? onLeft() : onRight();
  };

  onMounted(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  });
}
