<template>
  <div class="timeline" :class="{ collapsed: selected !== null }">
    <div class="timeline-track">
      <div class="timeline-progress" :style="{ width: animate ? '100%' : '0%' }" />
      <div class="timeline-points">
        <div
          v-for="(t, i) in items"
          :key="i"
          class="tl-point reached"
          :class="{ selected: selected === i }"
          @click="select(i)"
        >
          <div class="tl-dot" />
          <div class="tl-label" :class="{ below: i % 2 === 1 }">
            <div class="tl-year">{{ t.year }}</div>
            <div class="tl-place">{{ t.place }}</div>
            <div class="tl-role">{{ t.role }}</div>
            <div v-if="t.domain" class="tl-domain">{{ t.domain }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded detail card -->
    <transition name="card-expand">
      <div v-if="selected !== null && items[selected]?.detail" :key="selected" class="detail-card">
        <button class="detail-close" @click="selected = null">✕</button>

        <div class="detail-top">
          <div class="detail-year">{{ items[selected].year }}</div>
          <div class="detail-company">{{ items[selected].place }}</div>
          <div class="detail-badge">{{ items[selected].domain }}</div>
        </div>

        <div class="detail-body">
          <div class="detail-section">
            <div class="detail-section-label">Role</div>
            <div class="detail-role">{{ items[selected].role }}</div>
          </div>

          <div class="detail-section detail-section--main">
            <div class="detail-section-label">Scope</div>
            <div class="detail-text">{{ items[selected].detail }}</div>
          </div>

          <div v-if="items[selected].stack" class="detail-section">
            <div class="detail-section-label">Stack</div>
            <div class="detail-tags">
              <span
                v-for="(tag, ti) in items[selected].stack.split(' · ')"
                :key="ti"
                class="detail-tag"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  items: { type: Array, required: true },
});

const animate = ref(false);
const selected = ref(null);

function select(i) {
  selected.value = selected.value === i ? null : i;
}

onMounted(() => requestAnimationFrame(() => { animate.value = true; }));
</script>

<style scoped>
.timeline {
  flex: 1; display: flex; flex-direction: column;
  justify-content: center; position: relative;
  padding: 20px 0;
  transition: all 0.5s var(--ease-out);
}
.timeline.collapsed {
  justify-content: flex-start;
}

.timeline-track {
  position: relative; height: 2px; background: var(--line);
  margin: 90px 0 24px;
  transition: margin 0.5s var(--ease-out);
}
.timeline.collapsed .timeline-track {
  margin: 40px 0 16px;
}

.timeline-progress {
  position: absolute; top: 0; left: 0; height: 100%;
  background: var(--accent);
  transition: width 1.2s var(--ease-out);
}
.timeline-points {
  position: absolute; top: 50%; left: 0; right: 0;
  transform: translateY(-50%);
  display: flex; justify-content: space-between;
}
.tl-point { position: relative; cursor: pointer; }
.tl-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--bg); border: 2px solid var(--line-2);
  transition: all 0.3s;
}
.tl-point.reached .tl-dot {
  background: var(--accent); border-color: var(--accent);
  box-shadow: 0 0 16px rgba(212, 255, 58, 0.4);
}
.tl-point.selected .tl-dot {
  background: var(--accent-2); border-color: var(--accent-2);
  box-shadow: 0 0 20px rgba(255, 91, 58, 0.5);
  transform: scale(1.4);
}
.tl-point:hover .tl-dot { transform: scale(1.3); }
.tl-label {
  position: absolute; top: -60px; left: 50%;
  transform: translateX(-50%); text-align: center; width: 130px;
  transition: opacity 0.3s;
}
.tl-label.below { top: 28px; }

/* Collapse labels when detail is open */
.timeline.collapsed .tl-label { opacity: 0.4; font-size: 0.85em; }
.timeline.collapsed .tl-point.selected .tl-label { opacity: 1; }

.tl-year { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.15em; }
.tl-place { font-family: var(--serif); font-size: 14px; font-weight: 500; line-height: 1.2; margin-top: 3px; }
.tl-role { font-family: var(--mono); font-size: 9px; color: var(--ink-dim); margin-top: 2px; }
.tl-domain {
  font-family: var(--mono); font-size: 8px; color: var(--ink-dim);
  border: 1px solid var(--line-2); padding: 2px 5px;
  margin-top: 4px; display: inline-block; letter-spacing: 0.05em;
}

/* ===== Expanded detail card ===== */
.detail-card {
  flex: 1;
  border: 1px solid var(--line-2);
  background: var(--bg-2);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.detail-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, var(--accent-2), var(--accent));
}

.detail-close {
  position: absolute; top: 16px; right: 16px;
  background: transparent; border: 1px solid var(--line-2);
  color: var(--ink-dim); width: 32px; height: 32px; cursor: pointer;
  font-size: 14px; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; z-index: 2;
}
.detail-close:hover { border-color: var(--accent); color: var(--accent); }

/* Top row: year + company + badge */
.detail-top {
  display: flex; align-items: baseline; gap: 16px;
  padding: 24px 28px 0;
}
.detail-year {
  font-family: var(--mono); font-size: 40px; color: var(--accent);
  font-weight: 700; letter-spacing: -0.02em; line-height: 1;
}
.detail-company {
  font-family: var(--serif); font-size: 28px; font-weight: 500; line-height: 1;
}
.detail-badge {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
  color: var(--bg); background: var(--accent-2); text-transform: uppercase;
  padding: 4px 10px; white-space: nowrap;
}

/* Body — 3 sections in a row */
.detail-body {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 24px;
  padding: 20px 28px 24px;
  flex: 1;
  align-content: start;
}

.detail-section-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}
.detail-role {
  font-family: var(--serif); font-size: 18px; font-weight: 500; line-height: 1.2;
}

.detail-section--main {
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
  padding: 0 24px;
}
.detail-text {
  font-size: 14px; color: var(--ink-dim); line-height: 1.55;
}

.detail-tags {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.detail-tag {
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.03em;
  padding: 5px 12px; border: 1px solid rgba(212, 255, 58, 0.25);
  color: var(--accent); transition: all 0.2s; white-space: nowrap;
}
.detail-tag:hover { border-color: var(--accent); background: rgba(212, 255, 58, 0.06); }

/* Card expand transition */
.card-expand-enter-active {
  transition: all 0.45s var(--ease-out);
}
.card-expand-leave-active {
  transition: all 0.2s ease-in;
}
.card-expand-enter-from {
  opacity: 0; transform: translateY(30px); max-height: 0;
}
.card-expand-leave-to {
  opacity: 0; transform: translateY(10px);
}
</style>
