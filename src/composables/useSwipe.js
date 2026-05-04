import { onMounted, onUnmounted } from 'vue';

export function useSwipe(onLeft, onRight, { minDistance = 50 } = {}) {
  let startX = 0;
  let startY = 0;

  const onTouchStart = (e) => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Horizontal swipe — left/right
    if (absDx > absDy && absDx > minDistance) {
      dx < 0 ? onLeft() : onRight();
    }
    // Vertical swipe — down=next, up=prev
    else if (absDy > absDx && absDy > minDistance) {
      dy < 0 ? onLeft() : onRight();
    }
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
