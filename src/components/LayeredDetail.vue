<template>
  <div class="ld" :class="`ld--${size}`">
    <div class="ld-map">
      <div
        v-for="(layer, li) in layers"
        :key="li"
        class="ld-layer"
        :class="{ active: selected === li }"
        @click="select(li)"
      >
        <div class="ld-layer-label">{{ layer.label }}</div>
        <div class="ld-layer-nodes">
          <div
            v-for="(node, ni) in layer.nodes"
            :key="ni"
            class="ld-node"
            :class="`ld-node--${layer.color || 'dim'}`"
          >{{ node }}</div>
        </div>
      </div>
    </div>

    <div class="ld-info">
      <div v-if="selected === null" class="ld-prompt">{{ prompt }}</div>
      <transition name="ld-fade" mode="out-in">
        <div v-if="selected !== null" :key="selected" class="ld-detail">
          <div class="ld-detail-label">{{ layers[selected].label }}</div>
          <div v-if="layers[selected].title" class="ld-detail-title" v-html="layers[selected].title" />
          <div class="ld-detail-text">{{ layers[selected].detail }}</div>
          <div v-if="layers[selected].why" class="ld-detail-why">
            <span class="ld-why-label">Why:</span> {{ layers[selected].why }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  layers: { type: Array, required: true },
  prompt: { type: String, default: '' },
  size: { type: String, default: 'md' }, // 'md' (Architecture) | 'sm' (Infrastructure)
});

const emit = defineEmits(['select']);
const selected = ref(null);

function select(i) {
  selected.value = selected.value === i ? null : i;
  if (selected.value !== null) emit('select', i, props.layers[i]);
}
</script>

<style scoped>
.ld { display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; flex: 1; }
.ld--sm { gap: 24px; }

.ld-map { display: flex; flex-direction: column; gap: 8px; justify-content: center; }

.ld-layer {
  border: 1px solid var(--line);
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.ld--sm .ld-layer { padding: 10px 14px; }

.ld-layer::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s var(--ease-out);
}
.ld-layer:hover { border-color: var(--line-2); }
.ld-layer:hover::before { transform: scaleY(1); }
.ld-layer.active { border-color: var(--accent); background: rgba(212, 255, 58, 0.03); }
.ld-layer.active::before { transform: scaleY(1); }

.ld-layer-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--ink-dim); margin-bottom: 8px;
}
.ld--sm .ld-layer-label { margin-bottom: 6px; }

.ld-layer-nodes { display: flex; gap: 8px; flex-wrap: wrap; }
.ld--sm .ld-layer-nodes { gap: 6px; }

.ld-node {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.03em;
  padding: 5px 10px; border: 1px solid var(--line-2);
  background: var(--bg); transition: all 0.2s;
}
.ld--sm .ld-node { font-size: 10px; padding: 4px 8px; }

.ld-node--green  { border-color: rgba(212, 255, 58, 0.3); color: var(--accent); }
.ld-node--orange { border-color: rgba(255, 91, 58, 0.3); color: var(--accent-2); }
.ld-node--blue   { border-color: rgba(100, 150, 255, 0.3); color: rgba(100, 150, 255, 0.8); }
.ld-node--yellow { border-color: rgba(255, 200, 50, 0.3); color: rgba(255, 200, 50, 0.8); }
.ld-node--dim    { border-color: var(--line-2); color: var(--ink-dim); }

.ld-info { display: flex; flex-direction: column; justify-content: center; }
.ld-prompt {
  color: var(--ink-dim); font-family: var(--mono);
  font-size: 12px; letter-spacing: 0.1em;
}
.ld--sm .ld-prompt { font-size: 11px; }

.ld-detail-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}
.ld-detail-title {
  font-family: var(--serif); font-size: 26px; font-weight: 500;
  margin-bottom: 16px; line-height: 1.1;
}
.ld-detail-title :deep(em) { font-style: italic; color: var(--accent); }
.ld-detail-text {
  font-size: 15px; color: var(--ink-dim); line-height: 1.55;
  margin-bottom: 16px;
  border-left: 2px solid var(--accent);
  padding-left: 20px;
}
.ld--sm .ld-detail-text { font-size: 14px; margin-bottom: 12px; padding-left: 16px; }

.ld-detail-why {
  font-size: 14px; color: var(--ink-dim); line-height: 1.45;
  padding: 12px 16px; background: rgba(244, 241, 234, 0.03);
  border: 1px solid var(--line);
}
.ld--sm .ld-detail-why { font-size: 13px; padding: 10px 14px; }

.ld-why-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--accent-2); margin-right: 8px;
}

.ld-fade-enter-active { transition: all 0.35s var(--ease-out); }
.ld-fade-leave-active { transition: all 0.15s ease-in; }
.ld-fade-enter-from { opacity: 0; transform: translateY(6px); }
.ld-fade-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 700px) {
  .ld { grid-template-columns: 1fr; gap: 16px; }
  .ld-layer { padding: 10px 12px; }
  .ld-layer-label { font-size: 8px; margin-bottom: 6px; }
  .ld-node { font-size: 10px; padding: 4px 8px; }
  .ld-detail-title { font-size: 20px; }
  .ld-detail-text { font-size: 13px; padding-left: 14px; }
  .ld-detail-why { font-size: 13px; padding: 10px 12px; }
}
</style>
