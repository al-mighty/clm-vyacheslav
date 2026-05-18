<template>
  <ClmSlide num="08" :eyebrow="t.infra.eyebrow" :active="active" :is-prev="isPrev">
    <h2 v-html="t.infra.title" />

    <!-- Metrics strip -->
    <div class="infra-metrics">
      <div v-for="(m, i) in t.infra.metrics" :key="i" class="metric">
        <div class="metric-value">{{ m.value }}</div>
        <div class="metric-label">{{ m.label }}</div>
      </div>
    </div>

    <!-- View switcher -->
    <div class="view-tabs">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        class="view-tab"
        :class="{ active: view === idx }"
        @click="selectView(idx)"
      >{{ tab }}</button>
    </div>

    <!-- View body -->
    <div class="view-body">
      <transition name="view-fade" mode="out-in">

        <!-- View 1: live map -->
        <div v-if="view === 0" key="map" class="map-view">
          <div class="vps-bar">
            <span class="bar-label">{{ t.infra.vps }}</span>
          </div>
          <div class="nginx-bar">
            <span class="bar-label">🌐 cheslav-nginx</span>
            <span class="bar-detail">{{ t.infra.nginxDetail }}</span>
          </div>
          <div class="services-grid">
            <a
              v-for="(s, si) in t.infra.services"
              :key="si"
              class="service-card"
              :class="`service-card--${s.color}`"
              :href="s.url"
              target="_blank"
              rel="noopener"
            >
              <span class="service-status" :class="statusClass(s.id)" />
              <div class="service-name">{{ s.name }}</div>
              <div class="service-stack">{{ s.stack }}</div>
            </a>
          </div>
          <div class="ops-bar">{{ t.infra.opsBar }}</div>
        </div>

        <!-- View 2: layered tiers (interactive) -->
        <div v-else-if="view === 1" key="layers" class="layers-view">
          <div class="layers-map">
            <div
              v-for="(layer, li) in t.infra.tiers"
              :key="li"
              class="tier"
              :class="{ active: selectedTier === li }"
              @click="selectTier(li)"
            >
              <div class="tier-label">{{ layer.label }}</div>
              <div class="tier-nodes">
                <div
                  v-for="(node, ni) in layer.nodes"
                  :key="ni"
                  class="tier-node"
                  :class="`tier-node--${layer.color}`"
                >{{ node }}</div>
              </div>
            </div>
          </div>
          <div class="tier-info">
            <div v-if="selectedTier === null" class="tier-prompt">{{ t.infra.tierPrompt }}</div>
            <transition name="view-fade" mode="out-in">
              <div v-if="selectedTier !== null" :key="selectedTier" class="tier-detail">
                <div class="tier-detail-label">{{ t.infra.tiers[selectedTier].label }}</div>
                <div class="tier-detail-text">{{ t.infra.tiers[selectedTier].detail }}</div>
                <div class="tier-detail-why">
                  <span class="why-label">Why:</span> {{ t.infra.tiers[selectedTier].why }}
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- View 3: story (CI/CD pipeline + lessons) -->
        <div v-else key="story" class="story-view">
          <div class="pipeline">
            <div v-for="(step, si) in t.infra.pipeline" :key="si" class="pipe-step">
              <div class="pipe-icon">{{ step.icon }}</div>
              <div class="pipe-text">
                <div class="pipe-title">{{ step.title }}</div>
                <div class="pipe-detail">{{ step.detail }}</div>
              </div>
            </div>
          </div>
          <div class="lessons">
            <div class="lessons-title">{{ t.infra.lessonsTitle }}</div>
            <ul>
              <li v-for="(l, li) in t.infra.lessons" :key="li">
                <span class="lesson-marker">▸</span> {{ l }}
              </li>
            </ul>
          </div>
        </div>

      </transition>
    </div>
  </ClmSlide>
</template>

<script setup>
import { ref, computed } from 'vue';
import ClmSlide from '@/components/ClmSlide.vue';
import { useI18n } from '@/i18n/index.js';
import { useVeevaTracking } from '@/composables/useVeevaTracking.js';

defineProps({ active: Boolean, isPrev: Boolean });

const { t } = useI18n();
const { hotspotClick } = useVeevaTracking();
const view = ref(0);
const selectedTier = ref(null);
const statuses = ref({}); // service id → 'ok' | 'warn' | 'err' | undefined

const tabs = computed(() => t.value.infra.viewTabs);

function selectView(idx) {
  view.value = idx;
  hotspotClick('08-infrastructure', `view:${tabs.value[idx]}`);
  if (idx === 0) refreshStatuses();
}

function selectTier(i) {
  selectedTier.value = selectedTier.value === i ? null : i;
  if (selectedTier.value !== null) {
    hotspotClick('08-infrastructure', t.value.infra.tiers[i].label);
  }
}

function statusClass(id) {
  const s = statuses.value[id];
  if (!s) return 'status-unknown';
  return `status-${s}`;
}

// Fetch /health from each service that exposes one. Non-blocking, best-effort.
function refreshStatuses() {
  (t.value.infra.services || []).forEach((s) => {
    if (!s.health) return;
    fetch(s.health, { mode: 'cors', cache: 'no-cache', credentials: 'omit' })
      .then((r) => { statuses.value = { ...statuses.value, [s.id]: r.ok ? 'ok' : 'warn' }; })
      .catch(() => { statuses.value = { ...statuses.value, [s.id]: 'err' }; });
  });
}

refreshStatuses();
</script>

<style scoped>
/* Metrics strip */
.infra-metrics {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  margin-bottom: 18px;
}
.metric {
  border: 1px solid var(--line); padding: 10px 14px;
  text-align: center;
}
.metric-value {
  font-family: var(--serif); font-size: 26px; font-weight: 500;
  color: var(--accent); line-height: 1.1;
}
.metric-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--ink-dim); margin-top: 4px;
}

/* Tabs */
.view-tabs {
  display: flex; gap: 4px; margin-bottom: 14px;
  border-bottom: 1px solid var(--line);
}
.view-tab {
  background: none; border: none; cursor: pointer;
  padding: 8px 14px;
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--ink-dim);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.view-tab:hover { color: var(--ink); }
.view-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* View body */
.view-body { flex: 1; min-height: 0; }

/* Map view */
.map-view { display: flex; flex-direction: column; gap: 10px; }
.vps-bar, .nginx-bar, .ops-bar {
  padding: 8px 14px;
  font-family: var(--mono); font-size: 11px;
  background: rgba(244, 241, 234, 0.02);
  border: 1px solid var(--line);
}
.vps-bar { color: var(--ink-dim); font-size: 10px; letter-spacing: 0.1em; }
.nginx-bar { display: flex; gap: 18px; align-items: baseline; }
.bar-label { color: var(--accent); font-weight: 500; }
.bar-detail { color: var(--ink-dim); font-size: 10px; }
.ops-bar { color: var(--ink-dim); font-size: 10px; line-height: 1.5; }
.services-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
}
.service-card {
  position: relative;
  border: 1px solid var(--line-2);
  padding: 12px 10px 10px;
  text-decoration: none;
  transition: all 0.2s;
  background: var(--bg);
}
.service-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.service-card--green  { border-color: rgba(212, 255, 58, 0.3); }
.service-card--orange { border-color: rgba(255, 91, 58, 0.3); }
.service-card--blue   { border-color: rgba(100, 150, 255, 0.3); }
.service-card--yellow { border-color: rgba(255, 200, 50, 0.3); }
.service-card--dim    { border-color: var(--line-2); }
.service-status {
  position: absolute; top: 8px; right: 8px;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--ink-dim);
}
.status-ok      { background: rgb(0, 220, 130); box-shadow: 0 0 6px rgba(0, 220, 130, 0.5); }
.status-warn    { background: rgb(255, 200, 50); }
.status-err     { background: rgb(255, 91, 58); }
.status-unknown { background: var(--line-2); }
.service-name {
  font-family: var(--mono); font-size: 12px;
  color: var(--ink); margin-bottom: 4px;
}
.service-stack {
  font-family: var(--mono); font-size: 9px;
  color: var(--ink-dim); letter-spacing: 0.05em;
}

/* Layers view (reuses arch styling) */
.layers-view { display: grid; grid-template-columns: 1.1fr 1fr; gap: 24px; }
.layers-map { display: flex; flex-direction: column; gap: 8px; justify-content: center; }
.tier {
  border: 1px solid var(--line);
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.tier::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--accent); transform: scaleY(0); transform-origin: top;
  transition: transform 0.4s var(--ease-out);
}
.tier:hover { border-color: var(--line-2); }
.tier:hover::before { transform: scaleY(1); }
.tier.active { border-color: var(--accent); background: rgba(212, 255, 58, 0.03); }
.tier.active::before { transform: scaleY(1); }

.tier-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--ink-dim); margin-bottom: 6px;
}
.tier-nodes { display: flex; gap: 6px; flex-wrap: wrap; }
.tier-node {
  font-family: var(--mono); font-size: 10px;
  padding: 4px 8px; border: 1px solid var(--line-2);
  background: var(--bg);
}
.tier-node--green  { border-color: rgba(212, 255, 58, 0.3); color: var(--accent); }
.tier-node--orange { border-color: rgba(255, 91, 58, 0.3); color: var(--accent-2); }
.tier-node--blue   { border-color: rgba(100, 150, 255, 0.3); color: rgba(100, 150, 255, 0.8); }
.tier-node--yellow { border-color: rgba(255, 200, 50, 0.3); color: rgba(255, 200, 50, 0.8); }
.tier-node--dim    { border-color: var(--line-2); color: var(--ink-dim); }

.tier-info { display: flex; flex-direction: column; justify-content: center; }
.tier-prompt { color: var(--ink-dim); font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; }
.tier-detail-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}
.tier-detail-text {
  font-size: 14px; color: var(--ink-dim); line-height: 1.55;
  margin-bottom: 12px;
  border-left: 2px solid var(--accent); padding-left: 16px;
}
.tier-detail-why {
  font-size: 13px; color: var(--ink-dim); line-height: 1.45;
  padding: 10px 14px; background: rgba(244, 241, 234, 0.03);
  border: 1px solid var(--line);
}
.why-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--accent-2); margin-right: 8px;
}

/* Story view */
.story-view { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.pipeline { display: flex; flex-direction: column; gap: 10px; }
.pipe-step {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 10px 12px; border: 1px solid var(--line);
}
.pipe-icon {
  font-size: 18px; line-height: 1;
  min-width: 26px; text-align: center;
}
.pipe-title {
  font-family: var(--mono); font-size: 11px; color: var(--accent);
  letter-spacing: 0.05em; margin-bottom: 3px;
}
.pipe-detail {
  font-size: 12px; color: var(--ink-dim); line-height: 1.4;
}

.lessons {
  background: rgba(244, 241, 234, 0.02);
  border: 1px solid var(--line);
  padding: 16px;
}
.lessons-title {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent-2); margin-bottom: 12px;
}
.lessons ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.lessons li {
  font-size: 13px; color: var(--ink-dim); line-height: 1.5;
  display: flex; gap: 8px;
}
.lesson-marker { color: var(--accent); flex-shrink: 0; }

/* View transition */
.view-fade-enter-active { transition: all 0.3s var(--ease-out); }
.view-fade-leave-active { transition: all 0.15s ease-in; }
.view-fade-enter-from { opacity: 0; transform: translateY(6px); }
.view-fade-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 700px) {
  .infra-metrics { grid-template-columns: repeat(2, 1fr); }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .layers-view, .story-view { grid-template-columns: 1fr; }
  .metric-value { font-size: 20px; }
  .view-tab { padding: 6px 10px; font-size: 9px; }
}
</style>
