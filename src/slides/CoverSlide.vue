<template>
  <ClmSlide :active="active" :is-prev="isPrev">
    <div class="cover-top">
      <div class="cover-left">
        <div class="cover-avatar">
          <img src="/avatar.jpg" alt="Vyacheslav Kovalev" />
        </div>
        <div class="cover-name">
          Vyacheslav<br>
          <em>Kovalev.</em>
        </div>
      </div>
      <div class="cover-tagline" v-text="t.cover.tagline" />
    </div>
    <div class="cover-foot">
      <div class="cover-stats">
        <div class="cover-stat">
          <div class="num"><em>10+</em></div>
          <div class="lbl">{{ t.cover.stat1 }}</div>
        </div>
        <div class="cover-stat">
          <div class="num">10+</div>
          <div class="lbl">{{ t.cover.stat2 }}</div>
        </div>
        <div class="cover-stat">
          <div class="num">9</div>
          <div class="lbl">{{ t.cover.stat3 }}</div>
        </div>
      </div>
      <button class="cover-cta" @click="$emit('autoplay')">{{ t.cover.cta }}</button>
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });
defineEmits(['next', 'autoplay']);

const { t } = useI18n();
</script>

<style scoped>
.cover-top { display: flex; justify-content: space-between; align-items: flex-start; flex: 1; }
.cover-left { display: flex; align-items: center; gap: 32px; }
.cover-avatar {
  width: 120px; height: 120px; border-radius: 50%; overflow: hidden;
  border: 2px solid var(--accent); flex-shrink: 0;
}
.cover-avatar img { width: 100%; height: 100%; object-fit: cover; }
.cover-name {
  font-family: var(--serif);
  font-size: clamp(64px, 10vw, 140px);
  line-height: 0.9; font-weight: 300; letter-spacing: -0.04em;
}
.cover-name em { font-style: italic; font-weight: 500; color: var(--accent); }
.cover-tagline {
  font-family: var(--mono); font-size: 13px; letter-spacing: 0.15em;
  color: var(--ink-dim); max-width: 280px; text-align: right; line-height: 1.6;
  white-space: pre-line;
}
.cover-foot { display: flex; justify-content: space-between; align-items: flex-end; }
.cover-stats { display: flex; gap: 64px; }
.cover-stat .num { font-size: 56px; font-weight: 500; line-height: 1; color: var(--ink); font-family: var(--serif); }
.cover-stat .num em { font-style: italic; color: var(--accent); }
.cover-stat .lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-dim); margin-top: 8px; }
.cover-cta {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); border: 1px solid var(--accent);
  padding: 12px 20px; cursor: pointer; background: transparent; transition: all 0.3s;
}
.cover-cta:hover { background: var(--accent); color: var(--bg); }

@media (max-width: 900px) {
  .cover-top { flex: none; }
  .cover-foot { margin-top: 40px; }
}

@media (max-width: 900px) and (min-width: 601px) {
  .cover-name { font-size: clamp(48px, 10vw, 80px); }
  .cover-stats { gap: 40px; }
  .cover-stat .num { font-size: 44px; }
}

@media (max-width: 600px) {
  .cover-top { flex-direction: column; gap: 16px; }
  .cover-left { gap: 16px; }
  .cover-avatar { width: 72px; height: 72px; }
  .cover-name { font-size: clamp(40px, 12vw, 64px); }
  .cover-tagline { text-align: left; font-size: 11px; max-width: none; }
  .cover-foot { flex-direction: column; gap: 24px; align-items: flex-start; }
  .cover-stats { gap: 24px; flex-wrap: wrap; }
  .cover-stat .num { font-size: 36px; }
  .cover-stat .lbl { font-size: 9px; }
  .cover-cta { font-size: 10px; padding: 10px 16px; }
}
</style>
