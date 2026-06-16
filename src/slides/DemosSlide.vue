<template>
  <ClmSlide num="10" :eyebrow="t.demos.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.demos.title" />
    <div class="demos-grid">
      <div v-for="(demo, i) in t.demos.items" :key="i" class="demo-card" :class="{ 'demo-card--active': activeDemo === i }" @click="activeDemo = i">
        <div class="demo-card-header">
          <span class="demo-icon">{{ demo.icon }}</span>
          <div style="flex: 1; min-width: 0;">
            <h3>
              {{ demo.title }}
              <span v-if="demo.internal" class="demo-badge demo-badge--internal" title="Внутренний инструмент — требует авторизации">INTERNAL</span>
            </h3>
            <p>{{ demo.desc }}</p>
          </div>
        </div>
        <div class="demo-tags">
          <span v-for="tag in demo.tags" :key="tag" class="demo-tag">{{ tag }}</span>
        </div>
      </div>
    </div>
    <div v-if="activeDemo !== null" class="demo-preview">
      <div class="demo-preview-bar">
        <span class="demo-preview-url">{{ t.demos.items[activeDemo].url }}</span>
        <a v-if="t.demos.items[activeDemo].tgUrl" :href="t.demos.items[activeDemo].tgUrl" target="_blank" class="demo-preview-open">Telegram ↗</a>
        <a :href="t.demos.items[activeDemo].url" target="_blank" class="demo-preview-open">{{ t.demos.open }} ↗</a>
      </div>
      <iframe :src="t.demos.items[activeDemo].url" class="demo-iframe" frameborder="0" />
    </div>
  </ClmSlide>
</template>

<script setup>
import { ref } from 'vue';
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });
const { t } = useI18n();
const activeDemo = ref(0);
</script>

<style scoped>
.demos-grid { display: flex; gap: 12px; margin-top: 20px; }

.demo-card {
  flex: 1; padding: 16px; border: 1px solid var(--line-2); cursor: pointer;
  transition: all 0.3s; background: transparent;
}
.demo-card:hover { border-color: var(--accent); }
.demo-card--active { border-color: var(--accent); background: rgba(212, 255, 58, 0.04); }

.demo-card-header { display: flex; align-items: flex-start; gap: 10px; }
.demo-icon { font-size: 24px; flex-shrink: 0; }
.demo-card h3 { font-size: 14px; font-weight: 500; color: var(--ink); }
.demo-card p { font-size: 11px; color: var(--ink-dim); margin-top: 2px; line-height: 1.4; }
.demo-badge {
  display: inline-block; vertical-align: middle; margin-left: 6px;
  font-family: var(--mono); font-size: 8px; font-weight: 600; letter-spacing: 0.12em;
  padding: 2px 5px; border-radius: 3px; line-height: 1;
}
.demo-badge--internal {
  color: #ffb454; background: rgba(255, 180, 84, 0.12); border: 1px solid rgba(255, 180, 84, 0.4);
}
.demo-tags { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px; }
.demo-tag {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
  color: var(--ink-dim); border: 1px solid var(--line); padding: 2px 6px;
}

.demo-preview {
  margin-top: 16px; border: 1px solid var(--line-2); overflow: hidden;
  flex: 1; display: flex; flex-direction: column;
}
.demo-preview-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 12px; background: rgba(10, 14, 26, 0.8); border-bottom: 1px solid var(--line);
}
.demo-preview-url { font-family: var(--mono); font-size: 11px; color: var(--ink-dim); }
.demo-preview-open {
  font-family: var(--mono); font-size: 10px; color: var(--accent);
  text-decoration: none; letter-spacing: 0.1em;
}
.demo-iframe { width: 100%; flex: 1; min-height: 280px; background: #0a0e1a; }

@media (max-width: 600px) {
  .demos-grid { flex-direction: column; gap: 8px; }
  .demo-iframe { min-height: 200px; }
}
</style>
