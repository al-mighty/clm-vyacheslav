<template>
  <ClmSlide num="08" :eyebrow="t.skills.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.skills.title" />
    <ClmTagCloud :items="skills" />
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import ClmTagCloud from '@/components/ClmTagCloud.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();

const skills = [
  { name: 'Node.js', size: 'lg' },
  { name: 'NestJS', size: 'lg' },
  { name: 'TypeScript', size: 'lg' },
  { name: 'React', size: 'lg' },
  { name: 'PostgreSQL', size: 'lg' },
  { name: 'Python', size: 'md' },
  { name: 'Next.js', size: 'md' },
  { name: 'Kafka', size: 'md' },
  { name: 'Kubernetes', size: 'md' },
  { name: 'Docker', size: 'md' },
  { name: 'MongoDB', size: 'md' },
  { name: 'Redis', size: 'md' },
  { name: 'GraphQL', size: 'md' },
  { name: 'RabbitMQ', size: '' },
  { name: 'BullMQ', size: '' },
  { name: 'Vue.js', size: '' },
  { name: 'Redux', size: '' },
  { name: 'Storybook', size: '' },
  { name: 'GitLab CI', size: '' },
  { name: 'Jenkins', size: '' },
  { name: 'Jest', size: '' },
  { name: 'OpenAPI', size: '' },
  { name: 'WebSocket', size: '' },
  { name: 'Strapi', size: '' },
  { name: 'Nginx', size: '' },
  { name: 'S3', size: '' },
  { name: 'OpenSearch', size: '' },
  { name: 'Grafana', size: '' },
  { name: 'n8n', size: '' },
  { name: 'AI / LLM', size: 'md' },
  { name: 'GitHub Actions', size: '' },
  { name: 'Angular', size: '' },
  { name: 'MySQL', size: '' },
  { name: 'Express.js', size: '' },
  { name: 'Fastify', size: '' },
  { name: 'NATS', size: '' },
  { name: 'Lit', size: '' },
  { name: 'ethers.js', size: '' },
  { name: 'Sequelize', size: '' },
  { name: 'FastAPI', size: '' },
  { name: 'RAG', size: '' },
  { name: 'pgvector', size: '' },
  { name: 'GigaChat', size: '' },
  { name: 'Go', size: '' },
  { name: 'PixiJS', size: '' },
  { name: 'Telegram Mini App', size: '' },
];
</script>
