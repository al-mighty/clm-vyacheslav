<template>
  <div class="hotspot-layout">
    <div class="hotspot-img-wrap">
      <slot name="svg" />
    </div>
    <div class="hotspot-info">
      <div v-if="activeIndex === null" class="hs-prompt">{{ promptIdle }}</div>
      <div
        v-for="(item, i) in items"
        :key="i"
        class="hs-detail"
        :class="{ active: activeIndex === i }"
      >
        <h4>{{ item.title }} <em>{{ item.titleEm }}</em></h4>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  activeIndex: { type: Number, default: null },
  promptIdle: { type: String, default: '// click any pulsing node →' },
});
</script>

<style scoped>
.hotspot-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; flex: 1; }
.hotspot-img-wrap {
  border: 1px solid var(--line);
  background: var(--bg-2);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotspot-info { display: flex; flex-direction: column; justify-content: center; }
.hs-detail {
  border-left: 2px solid var(--accent);
  padding-left: 24px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.4s;
  height: 0;
  overflow: hidden;
}
.hs-detail.active { opacity: 1; transform: translateY(0); height: auto; }
.hs-detail h4 { font-family: var(--serif); font-size: 28px; font-weight: 500; margin-bottom: 12px; letter-spacing: -0.01em; }
.hs-detail h4 em { font-style: italic; color: var(--accent); }
.hs-detail p { color: var(--ink-dim); font-size: 15px; line-height: 1.55; }
.hs-prompt { color: var(--ink-dim); font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; }
</style>
