<template>
  <ClmSlide :eyebrow="t.overview.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.overview.title" />
    <div class="overview-grid">
      <div
        v-for="(s, i) in t.overview.tiles"
        :key="i"
        class="overview-tile"
        :class="`tile--${i}`"
        @click="$emit('goto', i + 2)"
      >
        <div class="tile-icon">{{ s.icon }}</div>
        <div class="tile-num">{{ String(i + 3).padStart(2, '0') }}</div>
        <div class="tile-title">{{ s.title }}</div>
        <div class="tile-desc">{{ s.desc }}</div>
        <div class="tile-glow" />
      </div>
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });
defineEmits(['goto']);

const { t } = useI18n();
</script>

<style scoped>
.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex: 1;
  align-content: center;
}
/* Last row with 3 items — center them */
.overview-tile:nth-child(5) { grid-column: 1; }
.overview-tile:nth-child(6) { grid-column: 2; }
.overview-tile:nth-child(7) { grid-column: 3; }

.overview-tile {
  border: 1px solid var(--line);
  padding: 22px 18px;
  cursor: pointer;
  transition: all 0.35s;
  position: relative;
  overflow: hidden;
}

/* Bottom accent bar — unique color per tile */
.overview-tile::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out);
}
.tile--0::before { background: var(--accent); }
.tile--1::before { background: var(--accent-2); }
.tile--2::before { background: rgba(100, 150, 255, 0.8); }
.tile--3::before { background: var(--accent); }
.tile--4::before { background: rgba(255, 200, 50, 0.8); }
.tile--5::before { background: rgba(100, 150, 255, 0.8); }
.tile--6::before { background: var(--accent-2); }

/* Hover — lift + color border */
.overview-tile:hover { transform: translateY(-4px); }
.overview-tile:hover::before { transform: scaleX(1); }
.tile--0:hover { border-color: rgba(212, 255, 58, 0.3); }
.tile--1:hover { border-color: rgba(255, 91, 58, 0.3); }
.tile--2:hover { border-color: rgba(100, 150, 255, 0.3); }
.tile--3:hover { border-color: rgba(212, 255, 58, 0.3); }
.tile--4:hover { border-color: rgba(255, 200, 50, 0.3); }
.tile--5:hover { border-color: rgba(100, 150, 255, 0.3); }
.tile--6:hover { border-color: rgba(255, 91, 58, 0.3); }

/* Glow */
.tile-glow {
  position: absolute; width: 120px; height: 120px; border-radius: 50%;
  filter: blur(60px); opacity: 0; transition: opacity 0.4s;
  pointer-events: none; z-index: 0; bottom: -40px; right: -40px;
}
.overview-tile:hover .tile-glow { opacity: 1; }
.tile--0 .tile-glow { background: rgba(212, 255, 58, 0.08); }
.tile--1 .tile-glow { background: rgba(255, 91, 58, 0.08); }
.tile--2 .tile-glow { background: rgba(100, 150, 255, 0.08); }
.tile--3 .tile-glow { background: rgba(212, 255, 58, 0.08); }
.tile--4 .tile-glow { background: rgba(255, 200, 50, 0.08); }
.tile--5 .tile-glow { background: rgba(100, 150, 255, 0.08); }
.tile--6 .tile-glow { background: rgba(255, 91, 58, 0.08); }

/* Icon */
.tile-icon {
  font-size: 22px; margin-bottom: 14px; line-height: 1;
  opacity: 0.2; transition: opacity 0.3s;
  position: relative; z-index: 1;
}
.overview-tile:hover .tile-icon { opacity: 0.5; }
.tile--0 .tile-icon { color: var(--accent); }
.tile--1 .tile-icon { color: var(--accent-2); }
.tile--2 .tile-icon { color: rgba(100, 150, 255, 0.8); }
.tile--3 .tile-icon { color: var(--accent); }
.tile--4 .tile-icon { color: rgba(255, 200, 50, 0.8); }
.tile--5 .tile-icon { color: rgba(100, 150, 255, 0.8); }
.tile--6 .tile-icon { color: var(--accent-2); }

.tile-num {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  margin-bottom: 10px;
  position: relative; z-index: 1;
}
.tile--0 .tile-num { color: var(--accent); }
.tile--1 .tile-num { color: var(--accent-2); }
.tile--2 .tile-num { color: rgba(100, 150, 255, 0.8); }
.tile--3 .tile-num { color: var(--accent); }
.tile--4 .tile-num { color: rgba(255, 200, 50, 0.8); }
.tile--5 .tile-num { color: rgba(100, 150, 255, 0.8); }
.tile--6 .tile-num { color: var(--accent-2); }

.tile-title {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 8px;
  position: relative; z-index: 1;
}
.tile-desc {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  line-height: 1.4;
  position: relative; z-index: 1;
}

@media (max-width: 900px) and (min-width: 601px) {
  .overview-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .overview-tile:nth-child(5),
  .overview-tile:nth-child(6),
  .overview-tile:nth-child(7) { grid-column: auto; }
  .overview-tile { padding: 16px 14px; }
  .tile-title { font-size: 16px; }
}

@media (max-width: 600px) {
  .overview-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .overview-tile:nth-child(5),
  .overview-tile:nth-child(6),
  .overview-tile:nth-child(7) { grid-column: auto; }
  .overview-tile { padding: 14px 12px; }
  .tile-icon { font-size: 16px; margin-bottom: 8px; }
  .tile-title { font-size: 15px; }
  .tile-desc { font-size: 9px; }
  .tile-num { font-size: 9px; margin-bottom: 6px; }
}
</style>
