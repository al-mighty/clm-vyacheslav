<template>
  <ClmSlide num="04" :eyebrow="t.timeline.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.timeline.title" />
    <ClmTimeline :items="t.timeline.items" :active="active" :initial-item="initialItem" :timeline-slugs="timelineSlugs" />
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import ClmTimeline from '@/components/ClmTimeline.vue';
import { useI18n } from '@/i18n/index.js';

defineProps({ active: Boolean, isPrev: Boolean, initialItem: { type: Number, default: null }, timelineSlugs: { type: Array, default: () => [] } });

const { t } = useI18n();
</script>
