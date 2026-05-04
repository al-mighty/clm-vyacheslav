<template>
  <div class="stack-bars">
    <div
      v-for="(s, i) in items"
      :key="i"
      class="stack-bar"
      :class="{ alt: s.alt }"
    >
      <div class="stack-bar-name">{{ s.name }}</div>
      <div class="stack-bar-track">
        <div
          class="stack-bar-fill"
          :style="{
            width: animate ? `${Math.min(100, (s.years / maxYears) * 100)}%` : '0%',
            transitionDelay: `${i * 60}ms`,
          }"
        />
      </div>
      <div class="stack-bar-years">{{ s.years }}+ yrs</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  items: { type: Array, required: true },
});

const maxYears = computed(() => Math.max(...props.items.map(s => s.years)));
const animate = ref(false);
onMounted(() => requestAnimationFrame(() => { animate.value = true; }));
</script>

<style scoped>
.stack-bars { display: flex; flex-direction: column; gap: 14px; align-self: center; }
.stack-bar {
  display: grid; grid-template-columns: 140px 1fr 60px;
  gap: 16px; align-items: center; cursor: pointer;
}
.stack-bar-name { font-family: var(--mono); font-size: 12px; color: var(--ink); letter-spacing: 0.05em; }
.stack-bar-track { height: 6px; background: var(--line); position: relative; overflow: hidden; }
.stack-bar-fill {
  position: absolute; top: 0; left: 0; height: 100%;
  background: linear-gradient(90deg, var(--accent), #a8d92a);
  width: 0; transition: width 1.4s var(--ease-out);
}
.stack-bar.alt .stack-bar-fill { background: linear-gradient(90deg, var(--accent-2), #d44a2a); }
.stack-bar-years { font-family: var(--mono); font-size: 11px; color: var(--ink-dim); text-align: right; }
.stack-bar:hover .stack-bar-name { color: var(--accent); }
</style>
