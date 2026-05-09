<template>
  <ClmSlide num="06" :eyebrow="t.dna.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.dna.title" />
    <div class="dna-grid">
      <div v-for="(block, i) in t.dna.blocks" :key="i" :class="['dna-card', `dna-card--${i}`]">
        <div class="dna-card-icon">{{ block.icon }}</div>
        <div class="dna-card-label">{{ block.label }}</div>
        <ul class="dna-card-items">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ul>
      </div>
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
</script>

<style scoped>
.dna-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
  flex: 1;
}

.dna-card {
  border: 1px solid var(--line-2);
  padding: 20px 18px;
  background: rgba(244, 241, 234, 0.02);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.dna-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-out);
}
.dna-card:hover {
  border-color: var(--line-2);
  transform: translateY(-2px);
}
.dna-card:hover::before { transform: scaleX(1); }

.dna-card--0::before { background: var(--accent); }
.dna-card--1::before { background: var(--accent-2); }
.dna-card--2::before { background: rgba(100, 150, 255, 0.8); }
.dna-card--3::before { background: rgba(255, 200, 50, 0.8); }

.dna-card-icon {
  font-size: 22px;
  margin-bottom: 10px;
  line-height: 1;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.dna-card:hover .dna-card-icon { opacity: 0.8; }
.dna-card--0 .dna-card-icon { color: var(--accent); }
.dna-card--1 .dna-card-icon { color: var(--accent-2); }
.dna-card--2 .dna-card-icon { color: rgba(100, 150, 255, 0.8); }
.dna-card--3 .dna-card-icon { color: rgba(255, 200, 50, 0.8); }

.dna-card-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
.dna-card--1 .dna-card-label { color: var(--accent-2); }
.dna-card--2 .dna-card-label { color: rgba(100, 150, 255, 0.8); }
.dna-card--3 .dna-card-label { color: rgba(255, 200, 50, 0.8); }

.dna-card-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.dna-card-items li {
  font-size: 14px;
  color: var(--ink);
  line-height: 1.4;
  padding-left: 14px;
  position: relative;
  font-weight: 300;
}
.dna-card-items li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-family: var(--mono);
}

@media (max-width: 900px) {
  .dna-grid { gap: 10px; margin-top: 16px; }
  .dna-card { padding: 14px 12px; }
  .dna-card-icon { font-size: 18px; margin-bottom: 6px; }
  .dna-card-label { font-size: 9px; margin-bottom: 8px; }
  .dna-card-items { gap: 4px; }
  .dna-card-items li { font-size: 12px; padding-left: 10px; }
}

@media (max-width: 600px) {
  .dna-grid { grid-template-columns: 1fr; gap: 8px; }
  .dna-card-items li { font-size: 13px; }
}
</style>
