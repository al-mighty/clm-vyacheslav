<template>
  <ClmSlide num="03" :eyebrow="t.pillars.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.pillars.title" />
    <p class="lead" style="margin-bottom: 24px">{{ t.pillars.subtitle }}</p>
    <div class="pillars-grid">
      <div
        v-for="(p, i) in t.pillars.items"
        :key="i"
        class="pillar"
        :class="[`pillar--${i}`, { expanded: expanded === i }]"
        @click="toggle(i)"
      >
        <div>
          <div class="pillar-icon">{{ icons[i] }}</div>
          <div class="pillar-num">{{ String(i + 1).padStart(2, '0') }}</div>
          <h3 class="pillar-title">{{ p.title }} <em>{{ p.titleEm }}</em></h3>
          <div class="pillar-desc">{{ p.desc }}</div>
        </div>
        <div class="pillar-detail">{{ p.detail }}</div>
        <div class="pillar-glow" />
      </div>
    </div>
  </ClmSlide>
</template>

<script setup>
import { ref } from 'vue';
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';
import { useVeevaTracking } from '@/composables/useVeevaTracking.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
const { pillarExpand } = useVeevaTracking();
const expanded = ref(null);
const icons = ['{ }', '< />', '▶▶'];

function toggle(i) {
  expanded.value = expanded.value === i ? null : i;
  if (expanded.value === i) pillarExpand(i);
}
</script>

<style scoped>
.pillars-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 24px; margin-top: 32px; flex: 1;
}

.pillar {
  border: 1px solid var(--line); padding: 32px 28px; cursor: pointer;
  transition: all 0.4s; display: flex; flex-direction: column; justify-content: space-between;
  position: relative; overflow: hidden;
}

/* Per-card glow background */
.pillar-glow {
  position: absolute; width: 200px; height: 200px; border-radius: 50%;
  filter: blur(80px); opacity: 0; transition: opacity 0.5s;
  pointer-events: none; z-index: 0;
}
.pillar:hover .pillar-glow, .pillar.expanded .pillar-glow { opacity: 1; }

.pillar--0 .pillar-glow { background: rgba(212, 255, 58, 0.06); bottom: -60px; right: -60px; }
.pillar--1 .pillar-glow { background: rgba(255, 91, 58, 0.06); bottom: -60px; right: -60px; }
.pillar--2 .pillar-glow { background: rgba(100, 150, 255, 0.06); bottom: -60px; right: -60px; }

/* Top accent bar — unique color per card */
.pillar::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 100%; height: 2px;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.5s var(--ease-out);
}
.pillar--0::before { background: var(--accent); }
.pillar--1::before { background: var(--accent-2); }
.pillar--2::before { background: rgba(100, 150, 255, 0.8); }

.pillar:hover { transform: translateY(-4px); }
.pillar--0:hover, .pillar--0.expanded { border-color: rgba(212, 255, 58, 0.3); }
.pillar--1:hover, .pillar--1.expanded { border-color: rgba(255, 91, 58, 0.3); }
.pillar--2:hover, .pillar--2.expanded { border-color: rgba(100, 150, 255, 0.3); }
.pillar:hover::before, .pillar.expanded::before { transform: scaleX(1); }

/* Icon */
.pillar-icon {
  font-family: var(--mono); font-size: 24px; margin-bottom: 20px;
  opacity: 0.25; transition: opacity 0.3s;
  position: relative; z-index: 1;
}
.pillar--0 .pillar-icon { color: var(--accent); }
.pillar--1 .pillar-icon { color: var(--accent-2); }
.pillar--2 .pillar-icon { color: rgba(100, 150, 255, 0.8); }
.pillar:hover .pillar-icon, .pillar.expanded .pillar-icon { opacity: 0.6; }

.pillar-num {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
  color: var(--ink-dim); position: relative; z-index: 1;
}
.pillar-title {
  font-family: var(--serif); font-size: 32px; font-weight: 400;
  line-height: 1.05; margin: 20px 0 12px; letter-spacing: -0.01em;
  position: relative; z-index: 1;
}
.pillar--0 .pillar-title em { color: var(--accent); }
.pillar--1 .pillar-title em { color: var(--accent-2); }
.pillar--2 .pillar-title em { color: rgba(100, 150, 255, 0.8); }

.pillar-desc {
  font-size: 14px; color: var(--ink-dim); line-height: 1.5;
  position: relative; z-index: 1;
}
.pillar-detail {
  margin-top: 16px; padding-top: 16px;
  font-family: var(--mono); font-size: 11px; color: var(--ink); line-height: 1.7;
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.5s, opacity 0.3s; white-space: pre-line;
  position: relative; z-index: 1;
}
.pillar--0 .pillar-detail { border-top: 1px solid rgba(212, 255, 58, 0.15); }
.pillar--1 .pillar-detail { border-top: 1px solid rgba(255, 91, 58, 0.15); }
.pillar--2 .pillar-detail { border-top: 1px solid rgba(100, 150, 255, 0.15); }
.pillar.expanded .pillar-detail { max-height: 200px; opacity: 1; }

@media (max-width: 900px) and (min-width: 601px) {
  .pillars-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .pillar { padding: 24px 20px; }
  .pillar-title { font-size: 26px; }
}

@media (max-width: 600px) {
  .pillars-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
  .pillar { padding: 20px 16px; }
  .pillar-icon { font-size: 20px; margin-bottom: 12px; }
  .pillar-title { font-size: 24px; margin: 12px 0 8px; }
  .pillar-desc { font-size: 13px; }
}
</style>
