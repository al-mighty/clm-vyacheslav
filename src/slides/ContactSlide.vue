<template>
  <ClmSlide num="09" :eyebrow="t.contact.eyebrow" :active="active" :is-prev="isPrev">
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
.contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; margin-top: 48px; width: 100%; max-width: 800px; }
.contact-item h3 { color: var(--ink-dim); margin-bottom: 12px; }
.contact-item a {
  color: var(--accent); font-family: var(--mono); font-size: 14px;
  text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s;
}
.contact-item a:hover { border-color: var(--accent); }

@media (max-width: 600px) {
  .contact-grid { grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }
  .contact-item a { font-size: 13px; }
}
</style>
