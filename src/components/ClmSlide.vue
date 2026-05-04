<template>
  <section class="clm-slide" :class="{ active, prev: isPrev }">
    <div class="slide-layer slide-layer--back">
      <div v-if="num" class="slide-num">{{ num }} / {{ total }}</div>
      <div v-if="eyebrow" class="slide-eyebrow">{{ eyebrow }}</div>
    </div>
    <div class="slide-layer slide-layer--front">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  num: { type: String, default: '' },
  total: { type: String, default: '09' },
  eyebrow: { type: String, default: '' },
  active: Boolean,
  isPrev: Boolean,
});
</script>

<style scoped>
.clm-slide {
  position: absolute;
  inset: 0;
  padding: var(--slide-padding);
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  transition: opacity var(--duration) var(--ease-out);
}
.clm-slide.active {
  opacity: 1;
  pointer-events: auto;
}

/* Parallax layers — back moves slower, front moves faster */
.slide-layer {
  transition: transform var(--duration) var(--ease-out), opacity var(--duration) var(--ease-out);
}

.slide-layer--back {
  opacity: 0.6;
  transform: translateX(15px);
}
.clm-slide.active .slide-layer--back {
  opacity: 1;
  transform: translateX(0);
}
.clm-slide.prev .slide-layer--back {
  opacity: 0;
  transform: translateX(-15px);
}

.slide-layer--front {
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(60px) scale(0.98);
}
.clm-slide.active .slide-layer--front {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.clm-slide.prev .slide-layer--front {
  opacity: 0;
  transform: translateX(-60px) scale(0.98);
}

.slide-num {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--ink-dim);
  margin-bottom: 8px;
}
.slide-eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--sp-5);
}
</style>
