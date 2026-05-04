<template>
  <ClmSlide num="06" :eyebrow="t.dna.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.dna.title" />
    <ClmVerticalNav :total-pages="2">
      <!-- Page 1: Architecture + Practices -->
      <div class="dna-page">
        <div class="dna-row">
          <div class="dna-card dna-card--0">
            <div class="dna-card-icon">{{ t.dna.blocks[0].icon }}</div>
            <div class="dna-card-label">{{ t.dna.blocks[0].label }}</div>
            <ul class="dna-card-items">
              <li v-for="(item, j) in t.dna.blocks[0].items" :key="j">{{ item }}</li>
            </ul>
          </div>
          <div class="dna-card dna-card--1">
            <div class="dna-card-icon">{{ t.dna.blocks[1].icon }}</div>
            <div class="dna-card-label">{{ t.dna.blocks[1].label }}</div>
            <ul class="dna-card-items">
              <li v-for="(item, j) in t.dna.blocks[1].items" :key="j">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Page 2: Domain + Leadership -->
      <div class="dna-page">
        <div class="dna-row">
          <div class="dna-card dna-card--2">
            <div class="dna-card-icon">{{ t.dna.blocks[2].icon }}</div>
            <div class="dna-card-label">{{ t.dna.blocks[2].label }}</div>
            <ul class="dna-card-items">
              <li v-for="(item, j) in t.dna.blocks[2].items" :key="j">{{ item }}</li>
            </ul>
          </div>
          <div class="dna-card dna-card--3">
            <div class="dna-card-icon">{{ t.dna.blocks[3].icon }}</div>
            <div class="dna-card-label">{{ t.dna.blocks[3].label }}</div>
            <ul class="dna-card-items">
              <li v-for="(item, j) in t.dna.blocks[3].items" :key="j">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </ClmVerticalNav>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import ClmVerticalNav from '@/components/ClmVerticalNav.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
</script>

<style scoped>
.dna-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dna-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.dna-card {
  border: 1px solid var(--line-2);
  padding: 28px 24px;
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
  transform: translateY(-3px);
}
.dna-card:hover::before { transform: scaleX(1); }

.dna-card--0::before { background: var(--accent); }
.dna-card--1::before { background: var(--accent-2); }
.dna-card--2::before { background: rgba(100, 150, 255, 0.8); }
.dna-card--3::before { background: rgba(255, 200, 50, 0.8); }

.dna-card-icon {
  font-size: 28px;
  margin-bottom: 16px;
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
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
}
.dna-card--1 .dna-card-label { color: var(--accent-2); }
.dna-card--2 .dna-card-label { color: rgba(100, 150, 255, 0.8); }
.dna-card--3 .dna-card-label { color: rgba(255, 200, 50, 0.8); }

.dna-card-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.dna-card-items li {
  font-size: 15px;
  color: var(--ink);
  line-height: 1.45;
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
  .dna-page { justify-content: flex-start; padding-top: 8px; }
  .dna-row { gap: 12px; }
  .dna-card { padding: 20px 16px; }
  .dna-card-icon { font-size: 20px; margin-bottom: 10px; }
  .dna-card-label { font-size: 10px; margin-bottom: 12px; }
  .dna-card-items { gap: 6px; }
  .dna-card-items li { font-size: 13px; }
}

@media (max-width: 600px) {
  .dna-row { grid-template-columns: 1fr; }
}
</style>
