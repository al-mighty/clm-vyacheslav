<template>
  <header class="clm-topbar">
    <div class="clm-brand">
      <span class="dot" />
      <span>{{ t.nav.brand }}</span>
    </div>
    <div class="clm-meta">
      <span>{{ t.nav.session }} &middot; <strong>{{ sessionTime }}</strong></span>
      <span>{{ t.nav.slide }} &middot; <strong>{{ current + 1 }}/{{ total }}</strong></span>
      <button class="lang-toggle" @click="onToggleLang">{{ locale === 'en' ? 'RU' : 'EN' }}</button>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from '@/i18n/index.js';
import { useVeevaTracking } from '@/composables/useVeevaTracking.js';

defineProps({
  sessionTime: { type: String, default: '00:00' },
  current: { type: Number, default: 0 },
  total: { type: Number, default: 9 },
});

const { t, locale, toggleLocale } = useI18n();
const { langToggle } = useVeevaTracking();

function onToggleLang() {
  toggleLocale();
  langToggle(locale.value);
}
</script>

<style scoped>
.clm-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-bottom: 1px solid var(--line);
  background: rgba(10, 14, 26, 0.6);
  backdrop-filter: blur(20px);
}
.clm-brand {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-dim);
  display: flex;
  align-items: center;
  gap: 12px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.clm-meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-dim);
  display: flex;
  align-items: center;
  gap: 24px;
}
.clm-meta span strong { color: var(--ink); font-weight: 500; }
.lang-toggle {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--accent);
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.lang-toggle:hover { background: var(--accent); color: var(--bg); }

@media (max-width: 600px) {
  .clm-topbar { padding: 0 12px; }
  .clm-brand { font-size: 9px; gap: 8px; }
  .clm-brand span:last-child { display: none; }
  .clm-meta { gap: 10px; font-size: 9px; }
  .clm-meta span:first-child { display: none; }
  .lang-toggle { font-size: 9px; padding: 3px 8px; }
}
</style>
