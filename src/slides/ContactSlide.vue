<template>
  <ClmSlide num="11" :eyebrow="t.contact.eyebrow" :active="active" :is-prev="isPrev">
    <h1 v-html="t.contact.title" />
    <p class="lead" style="margin-top: 24px">{{ t.contact.subtitle }}</p>
    <div class="contact-grid">
      <div class="contact-item">
        <h3>{{ t.contact.email }}</h3>
        <a href="mailto:dev.vyacheslav@gmail.com">dev.vyacheslav@gmail.com</a>
      </div>
      <div class="contact-item">
        <h3>{{ t.contact.telegram }}</h3>
        <a href="https://t.me/es_kanor" target="_blank">@es_kanor</a>
      </div>
      <div class="contact-item">
        <h3>{{ t.contact.phone }}</h3>
        <a href="tel:+79112201606">+7 (911) 220-16-06</a>
      </div>
      <div class="contact-item">
        <h3>{{ t.contact.support }}</h3>
        <a href="./support/" target="_blank" class="support-link">{{ t.contact.supportLink }}</a>
      </div>
    </div>
    <div class="demo-grid">
      <div class="demo-section">
        <div class="demo-badge">
          <span class="demo-icon">&#9654;</span>
          <div>
            <h3>{{ t.contact.demo }}</h3>
            <p class="demo-desc">{{ t.contact.demoDesc }}</p>
          </div>
        </div>
        <div class="demo-links">
          <a href="./game/" class="demo-btn" target="_blank">
            <span class="demo-btn-icon">&#9654;</span>
            {{ t.contact.demoPlay }}
          </a>
          <a href="./patternquest.apk" class="demo-btn demo-btn-ghost" download>
            <span class="demo-btn-icon">&#9660;</span>
            {{ t.contact.demoAndroid }}
          </a>
          <a href="https://github.com/al-mighty/patternquest-demo" target="_blank" class="demo-btn demo-btn-ghost">
            {{ t.contact.demoSource }}
          </a>
        </div>
      </div>
      <div class="demo-section">
        <div class="demo-badge">
          <span class="demo-icon" style="color: var(--accent-2)">&#9830;</span>
          <div>
            <h3>{{ t.contact.demo2 }}</h3>
            <p class="demo-desc">{{ t.contact.demo2Desc }}</p>
          </div>
        </div>
        <div class="demo-links">
          <a href="./chainpulse/" class="demo-btn" target="_blank" style="background: var(--accent-2); border-color: var(--accent-2)">
            <span class="demo-btn-icon">&#9654;</span>
            {{ t.contact.demo2Open }}
          </a>
          <a href="https://t.me/CheslavChain_bot" target="_blank" class="demo-btn demo-btn-ghost">
            {{ t.contact.demo2Bot }}
          </a>
          <a href="https://github.com/al-mighty/chainpulse" target="_blank" class="demo-btn demo-btn-ghost">
            {{ t.contact.demoSource }}
          </a>
        </div>
      </div>
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
</script>

<style scoped>
.contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; margin-top: 48px; width: 100%; max-width: 800px; }
.contact-item h3 { color: var(--ink-dim); margin-bottom: 12px; }
.contact-item a {
  color: var(--accent); font-family: var(--mono); font-size: 14px;
  text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s;
}
.contact-item a:hover { border-color: var(--accent); }
.support-link {
  color: #FBBF24 !important; border-bottom-color: transparent !important;
  background: rgba(251, 191, 36, 0.1); padding: 4px 10px; border-radius: 4px;
}
.support-link:hover { background: rgba(251, 191, 36, 0.2) !important; }

.demo-grid {
  margin-top: 48px; padding-top: 32px;
  border-top: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 24px;
  width: 100%; max-width: 800px;
}
.demo-section {
  display: flex; align-items: center; justify-content: space-between;
  gap: 32px;
}
.demo-badge { display: flex; align-items: center; gap: 16px; }
.demo-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--bg-2); border: 1px solid var(--line-2);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-size: 18px; flex-shrink: 0;
}
.demo-badge h3 { color: var(--ink); margin: 0; font-size: 15px; font-weight: 500; }
.demo-desc { color: var(--ink-dim); font-family: var(--mono); font-size: 11px; margin-top: 4px; }
.demo-links { display: flex; gap: 12px; flex-shrink: 0; }
.demo-btn {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em;
  text-transform: uppercase; text-decoration: none;
  padding: 10px 18px; border-radius: 6px; transition: all 0.3s;
  background: var(--accent); color: var(--bg); border: 1px solid var(--accent);
  display: flex; align-items: center; gap: 6px;
}
.demo-btn:hover { opacity: 0.85; }
.demo-btn-icon { font-size: 10px; }
.demo-btn-ghost {
  background: transparent; color: var(--accent); border-color: var(--line-2);
}
.demo-btn-ghost:hover { border-color: var(--accent); }

@media (max-width: 600px) {
  .contact-grid { grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
  .contact-item a { font-size: 13px; }
  .demo-grid { margin-top: 24px; padding-top: 20px; }
  .demo-section { flex-direction: column; align-items: flex-start; }
  .demo-links { flex-direction: column; width: 100%; }
  .demo-btn { justify-content: center; font-size: 10px; padding: 10px 14px; }
}
</style>
