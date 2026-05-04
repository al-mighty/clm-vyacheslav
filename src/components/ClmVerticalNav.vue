<template>
  <div class="vn-wrap" @wheel.prevent="onWheel" @touchstart="onTouchStart" @touchend.prevent="onTouchEnd">
    <div class="vn-viewport">
      <div class="vn-track" :style="{ transform: `translateY(-${page * 100}%)` }">
        <slot />
      </div>
    </div>

    <!-- Vertical arrows -->
    <div class="vn-controls">
      <button class="vn-arrow" :disabled="page === 0" @click="page--">↑</button>
      <div class="vn-dots">
        <div
          v-for="i in totalPages"
          :key="i"
          class="vn-dot"
          :class="{ active: i - 1 === page }"
          @click="page = i - 1"
        />
      </div>
      <button class="vn-arrow" :disabled="page === totalPages - 1" @click="page++">↓</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  totalPages: { type: Number, required: true },
});

const page = ref(0);
let wheelLocked = false;

function onWheel(e) {
  if (wheelLocked) return;
  if (Math.abs(e.deltaY) < 20) return;
  wheelLocked = true;
  if (e.deltaY > 0 && page.value < props.totalPages - 1) page.value++;
  else if (e.deltaY < 0 && page.value > 0) page.value--;
  setTimeout(() => { wheelLocked = false; }, 500);
}

let touchStartY = 0;
function onTouchStart(e) {
  touchStartY = e.changedTouches[0].clientY;
}
function onTouchEnd(e) {
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dy) < 40) return;
  e.stopPropagation();
  if (dy < 0 && page.value < props.totalPages - 1) page.value++;
  else if (dy > 0 && page.value > 0) page.value--;
}

function onKey(e) {
  if (e.key === 'ArrowDown' && page.value < props.totalPages - 1) {
    e.preventDefault();
    e.stopPropagation();
    page.value++;
  } else if (e.key === 'ArrowUp' && page.value > 0) {
    e.preventDefault();
    e.stopPropagation();
    page.value--;
  }
}

onMounted(() => window.addEventListener('keydown', onKey, true));
onUnmounted(() => window.removeEventListener('keydown', onKey, true));
</script>

<style scoped>
.vn-wrap {
  flex: 1;
  display: flex;
  gap: 16px;
  min-height: 0;
}
.vn-viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.vn-track {
  transition: transform 0.6s var(--ease-out);
  height: 100%;
}

/* Each page must be 100% height of viewport */
.vn-track > :deep(*) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Vertical controls */
.vn-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 32px;
  flex-shrink: 0;
}
.vn-arrow {
  background: transparent;
  border: 1px solid var(--line-2);
  color: var(--ink-dim);
  width: 28px; height: 28px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.vn-arrow:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.vn-arrow:disabled { opacity: 0.2; cursor: not-allowed; }

.vn-dots {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vn-dot {
  width: 3px; height: 16px;
  background: var(--line-2);
  cursor: pointer;
  transition: background 0.3s;
}
.vn-dot.active { background: var(--accent); }
.vn-dot:hover { background: var(--ink-dim); }

@media (max-width: 600px) {
  .vn-controls { width: 24px; }
  .vn-arrow { width: 22px; height: 22px; font-size: 11px; }
  .vn-dot { width: 2px; height: 12px; }
}
</style>
