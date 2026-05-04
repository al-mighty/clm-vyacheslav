<template>
  <div class="skill-cloud">
    <span
      v-for="(s, i) in items"
      :key="i"
      class="skill-tag"
      :class="s.size"
    >{{ s.name }}</span>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<style scoped>
.skill-cloud {
  flex: 1; display: flex; align-items: center; justify-content: center;
  flex-wrap: wrap; gap: 12px; padding: 0 80px;
}
.skill-tag {
  font-family: var(--mono); font-size: 13px; letter-spacing: 0.05em;
  padding: 8px 16px; border: 1px solid var(--line-2);
  color: var(--ink); transition: all 0.3s; cursor: default;
}
.skill-tag.lg { font-size: 22px; padding: 12px 24px; color: var(--accent); border-color: var(--accent); }
.skill-tag.md { font-size: 16px; padding: 10px 20px; }
.skill-tag:hover { border-color: var(--accent); color: var(--accent); transform: scale(1.05); }

@media (max-width: 600px) {
  .skill-cloud { padding: 0; gap: 6px; }
  .skill-tag { font-size: 11px; padding: 5px 10px; }
  .skill-tag.lg { font-size: 16px; padding: 8px 14px; }
  .skill-tag.md { font-size: 13px; padding: 6px 12px; }
}
</style>
