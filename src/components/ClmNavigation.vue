<template>
  <footer class="clm-bottom">
    <button class="nav-btn" :disabled="isFirst" @click="$emit('prev')">&lsaquo;</button>
    <div class="nav-dots">
      <div
        v-for="i in total"
        :key="i"
        class="nav-dot"
        :class="{ active: i - 1 === current }"
        @click="$emit('goto', i - 1)"
      />
    </div>
    <div class="progress-info">
      <span>{{ t.nav.viewTime }} &middot; {{ viewTime }}s</span>
    </div>
    <button class="nav-btn" :disabled="isLast" @click="$emit('next')">&rsaquo;</button>
  </footer>
</template>

<script setup>
import { useI18n } from '@/i18n/index.js';
const { t } = useI18n();

defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  isFirst: Boolean,
  isLast: Boolean,
  viewTime: { type: Number, default: 0 },
});

defineEmits(['prev', 'next', 'goto']);
</script>

<style scoped>
.clm-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-top: 1px solid var(--line);
  background: rgba(10, 14, 26, 0.6);
  backdrop-filter: blur(20px);
}
.nav-btn {
  background: transparent;
  border: 1px solid var(--line-2);
  color: var(--ink);
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.nav-dots { display: flex; gap: 8px; }
.nav-dot {
  width: 28px;
  height: 3px;
  background: var(--line-2);
  cursor: pointer;
  transition: background 0.3s;
}
.nav-dot.active { background: var(--accent); }
.nav-dot:hover { background: var(--ink-dim); }
.progress-info {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-dim);
  letter-spacing: 0.15em;
}

@media (max-width: 600px) {
  .clm-bottom { padding: 0 12px; }
  .nav-btn { width: 32px; height: 32px; font-size: 14px; }
  .nav-dots { gap: 4px; }
  .nav-dot { width: 18px; height: 3px; }
  .progress-info { display: none; }
}
</style>
