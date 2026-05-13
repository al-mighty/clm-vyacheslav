<template>
  <ClmSlide num="05" :eyebrow="t.stack.eyebrow" :active="active" :is-prev="isPrev">
    <div class="stack-layout">
      <div class="stack-side">
        <h2 v-html="t.stack.title" />
        <p>{{ t.stack.desc }}</p>
      </div>
      <ClmBars :items="stack" />
    </div>
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import ClmBars from '@/components/ClmBars.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();

const stack = [
  { name: 'Node.js', years: 7, alt: false },
  { name: 'NestJS', years: 6, alt: false },
  { name: 'TypeScript', years: 6, alt: false },
  { name: 'React', years: 6, alt: false },
  { name: 'PostgreSQL', years: 6, alt: true },
  { name: 'MongoDB', years: 6, alt: true },
  { name: 'Docker', years: 6, alt: false },
  { name: 'Redis', years: 5, alt: true },
  { name: 'Next.js', years: 4, alt: false },
  { name: 'RabbitMQ', years: 4, alt: true },
  { name: 'GitLab CI/CD', years: 4, alt: false },
  { name: 'Kafka', years: 3, alt: true },
  { name: 'Kubernetes', years: 3, alt: false },
  { name: 'GitHub Actions', years: 3, alt: false },
  { name: 'Python', years: 2, alt: true },
  { name: 'Fastify', years: 2, alt: false },
  { name: 'NATS', years: 2, alt: true },
];
</script>

<style scoped>
.stack-layout { display: grid; grid-template-columns: 320px 1fr; gap: 64px; flex: 1; }
.stack-side h2 { margin-bottom: 24px; }
.stack-side p { color: var(--ink-dim); font-size: 16px; }

@media (max-width: 600px) {
  .stack-layout { grid-template-columns: 1fr; gap: 20px; }
  .stack-side p { font-size: 14px; }
}
</style>
