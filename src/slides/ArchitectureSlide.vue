<template>
  <ClmSlide num="07" :eyebrow="t.arch.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.arch.title" />
    <div class="arch-layout">
      <!-- Left: layered system map -->
      <div class="arch-map">
        <div
          v-for="(layer, li) in t.arch.layers"
          :key="li"
          class="arch-layer"
          :class="{ active: selectedLayer === li }"
          @click="selectLayer(li)"
        >
          <div class="layer-label">{{ layer.label }}</div>
          <div class="layer-nodes">
            <div
              v-for="(node, ni) in layer.nodes"
              :key="ni"
              class="layer-node"
              :class="`layer-node--${layer.color}`"
            >{{ node }}</div>
          </div>
        </div>
      </div>

      <!-- Right: detail panel -->
      <div class="arch-info">
        <div v-if="selectedLayer === null" class="arch-prompt">{{ t.arch.prompt }}</div>
        <transition name="arch-fade" mode="out-in">
          <div v-if="selectedLayer !== null" :key="selectedLayer" class="arch-detail">
            <div class="arch-detail-label">{{ t.arch.layers[selectedLayer].label }}</div>
            <div class="arch-detail-title" v-html="t.arch.layers[selectedLayer].title" />
            <div class="arch-detail-text">{{ t.arch.layers[selectedLayer].detail }}</div>
            <div class="arch-detail-why">
              <span class="why-label">Why:</span> {{ t.arch.layers[selectedLayer].why }}
            </div>
          </div>
        </transition>
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
const { hotspotClick } = useVeevaTracking();
const selectedLayer = ref(null);

function selectLayer(i) {
  selectedLayer.value = selectedLayer.value === i ? null : i;
  if (selectedLayer.value !== null) {
    hotspotClick('07-architecture', t.value.arch.layers[i].label);
  }
}
</script>

<style scoped>
.arch-layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; flex: 1; }

/* System map */
.arch-map {
  display: flex; flex-direction: column; gap: 8px;
  justify-content: center;
}
.arch-layer {
  border: 1px solid var(--line);
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.arch-layer::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s var(--ease-out);
}
.arch-layer:hover { border-color: var(--line-2); }
.arch-layer:hover::before { transform: scaleY(1); }
.arch-layer.active { border-color: var(--accent); background: rgba(212, 255, 58, 0.03); }
.arch-layer.active::before { transform: scaleY(1); }

.layer-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--ink-dim); margin-bottom: 8px;
}
.layer-nodes { display: flex; gap: 8px; flex-wrap: wrap; }
.layer-node {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.03em;
  padding: 5px 10px; border: 1px solid var(--line-2);
  background: var(--bg); transition: all 0.2s;
}
.layer-node--green { border-color: rgba(212, 255, 58, 0.3); color: var(--accent); }
.layer-node--orange { border-color: rgba(255, 91, 58, 0.3); color: var(--accent-2); }
.layer-node--blue { border-color: rgba(100, 150, 255, 0.3); color: rgba(100, 150, 255, 0.8); }
.layer-node--dim { border-color: var(--line-2); color: var(--ink-dim); }
.layer-node--yellow { border-color: rgba(255, 200, 50, 0.3); color: rgba(255, 200, 50, 0.8); }

/* Detail panel */
.arch-info { display: flex; flex-direction: column; justify-content: center; }
.arch-prompt {
  color: var(--ink-dim); font-family: var(--mono);
  font-size: 12px; letter-spacing: 0.1em;
}
.arch-detail-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}
.arch-detail-title {
  font-family: var(--serif); font-size: 26px; font-weight: 500;
  margin-bottom: 16px; line-height: 1.1;
}
.arch-detail-title :deep(em) { font-style: italic; color: var(--accent); }
.arch-detail-text {
  font-size: 15px; color: var(--ink-dim); line-height: 1.55;
  margin-bottom: 16px;
  border-left: 2px solid var(--accent);
  padding-left: 20px;
}
.arch-detail-why {
  font-size: 14px; color: var(--ink-dim); line-height: 1.45;
  padding: 12px 16px; background: rgba(244, 241, 234, 0.03);
  border: 1px solid var(--line);
}
.why-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--accent-2); margin-right: 8px;
}

/* Transition */
.arch-fade-enter-active { transition: all 0.35s var(--ease-out); }
.arch-fade-leave-active { transition: all 0.15s ease-in; }
.arch-fade-enter-from { opacity: 0; transform: translateY(6px); }
.arch-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
