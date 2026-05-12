<template>
  <ClmSlide num="10" :eyebrow="t.video.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.video.title" />
    <div class="video-container">
      <div v-if="!videoUrl" class="video-placeholder">
        <span class="video-play">▶</span>
        <p>{{ t.video.placeholder }}</p>
      </div>
      <iframe
        v-else
        :src="videoUrl"
        class="video-player"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>
    <div class="video-info">
      <div class="video-stat" v-for="(stat, i) in t.video.stats" :key="i">
        <div class="video-stat-num">{{ stat.num }}</div>
        <div class="video-stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });
const { t } = useI18n();

// TODO: Replace with actual video URL when recorded
const videoUrl = '';
</script>

<style scoped>
.video-container {
  margin-top: 24px; flex: 1; display: flex;
  border: 1px solid var(--line-2); overflow: hidden;
  background: var(--bg-2);
}
.video-placeholder {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  min-height: 300px;
}
.video-play {
  width: 72px; height: 72px; border-radius: 50%;
  border: 2px solid var(--accent); color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; opacity: 0.6;
}
.video-placeholder p { color: var(--ink-dim); font-family: var(--mono); font-size: 12px; }
.video-player { width: 100%; flex: 1; min-height: 360px; }

.video-info {
  display: flex; gap: 48px; margin-top: 24px;
}
.video-stat-num {
  font-family: var(--serif); font-size: 32px; font-weight: 500;
  color: var(--accent); line-height: 1;
}
.video-stat-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--ink-dim); margin-top: 6px;
}

@media (max-width: 600px) {
  .video-info { gap: 24px; flex-wrap: wrap; }
  .video-stat-num { font-size: 24px; }
}
</style>
