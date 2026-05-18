<template>
  <ClmSlide num="07" :eyebrow="t.arch.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.arch.title" />
    <LayeredDetail
      :layers="t.arch.layers"
      :prompt="t.arch.prompt"
      size="md"
      @select="onSelect"
    />
  </ClmSlide>
</template>

<script setup>
import ClmSlide from '@/components/ClmSlide.vue';
import LayeredDetail from '@/components/LayeredDetail.vue';
import { useI18n } from '@/i18n/index.js';
import { useVeevaTracking } from '@/composables/useVeevaTracking.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
const { hotspotClick } = useVeevaTracking();

function onSelect(i, layer) {
  hotspotClick('07-architecture', layer.label);
}
</script>
