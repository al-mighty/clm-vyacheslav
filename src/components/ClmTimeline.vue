<template>
  <div class="timeline" :class="{ 'has-detail': selected !== null }">
    <div ref="listEl" class="tl-list" :class="{ collapsed: selected !== null, 'scrolled-bottom': scrolledBottom }" @scroll="onScroll">
      <div
        v-for="(t, i) in items"
        :key="i"
        class="tl-item"
        :class="{ selected: selected === i, reached: animate }"
        @click="select(i)"
      >
        <div class="tl-left">
          <div class="tl-year">{{ t.year }}</div>
          <div class="tl-line">
            <div class="tl-dot" />
          </div>
        </div>
        <div class="tl-content">
          <div class="tl-place">{{ t.place }}</div>
          <div class="tl-role">{{ t.role }}</div>
          <div v-if="t.domain" class="tl-domain">{{ t.domain }}</div>
        </div>
      </div>
    </div>

    <!-- Expanded detail card -->
    <transition name="card-expand">
      <div v-if="selected !== null && items[selected]?.detail" :key="selected" class="detail-card">
        <div class="detail-nav">
          <button class="detail-nav-btn" :disabled="selected <= 0" @click.stop="selected--">↑</button>
          <span class="detail-nav-count">{{ selected + 1 }} / {{ items.length }}</span>
          <button class="detail-nav-btn" :disabled="selected >= items.length - 1" @click.stop="selected++">↓</button>
          <button class="detail-close" @click="selected = null">✕</button>
        </div>

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
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  items: { type: Array, required: true },
  active: { type: Boolean, default: false },
  initialItem: { type: Number, default: null },
  timelineSlugs: { type: Array, default: () => [] },
});

const animate = ref(false);
const selected = ref(props.initialItem);
const listEl = ref(null);
const scrolledBottom = ref(false);

function select(i) {
  selected.value = selected.value === i ? null : i;
  updateHash();
}

function updateHash() {
  if (selected.value !== null && props.timelineSlugs[selected.value]) {
    history.replaceState(null, '', `#timeline/${props.timelineSlugs[selected.value]}`);
  } else {
    history.replaceState(null, '', '#timeline');
  }
}

function onKey(e) {
  if (!props.active) return;
  if (selected.value === null) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.stopPropagation();
      selected.value = 0;
    }
    return;
  }
  if (e.key === 'ArrowUp' && selected.value > 0) {
    e.stopPropagation();
    selected.value--;
  } else if (e.key === 'ArrowDown' && selected.value < props.items.length - 1) {
    e.stopPropagation();
    selected.value++;
  } else if (e.key === 'Escape') {
    selected.value = null;
  }
}

function onScroll() {
  if (!listEl.value) return;
  const el = listEl.value;
  scrolledBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
}

watch(selected, (val) => {
  updateHash();
  // Автоскролл к выбранному элементу
  if (val !== null && listEl.value) {
    const item = listEl.value.children[val];
    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

onMounted(() => {
  requestAnimationFrame(() => { animate.value = true; });
  window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.timeline {
  flex: 1; position: relative;
  padding: 8px 0; overflow: hidden;
}

/* ===== Vertical list in two columns ===== */
.tl-list {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px;
  overflow-y: auto; padding-right: 8px;
  grid-template-rows: repeat(5, auto);
  grid-auto-flow: column;
  height: 100%;
}
.tl-list::-webkit-scrollbar { width: 3px; }
.tl-list::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 3px; }

.tl-item {
  display: flex; gap: 12px; cursor: pointer;
  padding: 6px 10px; border-radius: 4px;
  transition: all 0.3s;
}
.tl-item:hover { background: rgba(244, 241, 234, 0.03); }
.tl-item.selected { background: rgba(255, 91, 58, 0.06); }

/* Left column: year + vertical line */
.tl-left {
  display: flex; flex-direction: column; align-items: center;
  width: 52px; flex-shrink: 0;
}
.tl-year {
  font-family: var(--mono); font-size: 10px; color: var(--accent);
  letter-spacing: 0.1em; white-space: nowrap;
}
.tl-line {
  flex: 1; width: 2px; background: var(--line);
  margin-top: 6px; position: relative;
  display: flex; justify-content: center;
}
.tl-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--bg); border: 2px solid var(--line-2);
  position: absolute; top: 0;
  transition: all 0.4s var(--ease-out);
}
.tl-item.reached .tl-dot {
  background: var(--accent); border-color: var(--accent);
  box-shadow: 0 0 12px rgba(212, 255, 58, 0.3);
}
.tl-item.selected .tl-dot {
  background: var(--accent-2); border-color: var(--accent-2);
  box-shadow: 0 0 16px rgba(255, 91, 58, 0.4);
  transform: scale(1.3);
}
/* Hide line on last item */
.tl-item:last-child .tl-line { background: transparent; }

/* Right column: company info */
.tl-content { flex: 1; min-width: 0; }
.tl-place {
  font-family: var(--serif); font-size: 14px; font-weight: 500; line-height: 1.2;
}
.tl-role {
  font-family: var(--mono); font-size: 9px; color: var(--ink-dim); margin-top: 1px;
}
.tl-domain {
  font-family: var(--mono); font-size: 7px; color: var(--ink-dim);
  border: 1px solid var(--line-2); padding: 1px 5px;
  margin-top: 3px; display: inline-block; letter-spacing: 0.05em;
}

/* Dim non-selected items when card is open */
.tl-list.collapsed .tl-item { opacity: 0.4; }
.tl-list.collapsed .tl-item.selected { opacity: 1; }

/* ===== Detail card ===== */
.detail-card {
  border: 1px solid var(--line-2);
  background: var(--bg-2);
  position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 600px; max-width: 90%; max-height: 90%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.detail-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, var(--accent-2), var(--accent));
}

.detail-nav {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px 0; justify-content: flex-end;
}
.detail-nav-btn {
  background: transparent; border: 1px solid var(--line-2);
  color: var(--ink-dim); width: 28px; height: 28px; cursor: pointer;
  font-size: 14px; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; font-family: var(--mono);
}
.detail-nav-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.detail-nav-btn:disabled { opacity: 0.2; cursor: default; }
.detail-nav-count {
  font-family: var(--mono); font-size: 10px; color: var(--ink-dim);
  letter-spacing: 0.1em;
}
.detail-close {
  background: transparent; border: 1px solid var(--line-2);
  color: var(--ink-dim); width: 28px; height: 28px; cursor: pointer;
  font-size: 13px; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s; margin-left: 8px;
}
.detail-close:hover { border-color: var(--accent); color: var(--accent); }

.detail-top {
  display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
  padding: 20px 24px 0;
}
.detail-year {
  font-family: var(--mono); font-size: 32px; color: var(--accent);
  font-weight: 700; letter-spacing: -0.02em; line-height: 1;
}
.detail-company {
  font-family: var(--serif); font-size: 24px; font-weight: 500; line-height: 1;
}
.detail-badge {
  font-family: var(--mono); font-size: 8px; letter-spacing: 0.15em;
  color: var(--bg); background: var(--accent-2); text-transform: uppercase;
  padding: 3px 8px; white-space: nowrap;
}

.detail-body {
  display: flex; flex-direction: column; gap: 16px;
  padding: 16px 24px 20px;
  flex: 1;
}

.detail-section-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
}
.detail-role {
  font-family: var(--serif); font-size: 16px; font-weight: 500; line-height: 1.2;
}

.detail-section--main {
  border-top: 1px solid var(--line);
  padding-top: 12px;
}
.detail-text {
  font-size: 13px; color: var(--ink-dim); line-height: 1.55;
}

.detail-tags {
  display: flex; flex-wrap: wrap; gap: 5px;
}
.detail-tag {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.03em;
  padding: 4px 10px; border: 1px solid rgba(212, 255, 58, 0.25);
  color: var(--accent); transition: all 0.2s; white-space: nowrap;
}
.detail-tag:hover { border-color: var(--accent); background: rgba(212, 255, 58, 0.06); }

/* Card transition — instant, no flicker */
.card-expand-enter-active { transition: none; }
.card-expand-leave-active { transition: none; }
.card-expand-enter-from { opacity: 1; }
.card-expand-leave-to { opacity: 0; }

/* ===== Tablet ===== */
@media (max-width: 900px) and (min-width: 601px) {
  .tl-list { grid-template-columns: 1fr; grid-template-rows: none; grid-auto-flow: row; }
  .tl-list.collapsed { max-height: 80px; overflow: hidden; }
  .detail-year { font-size: 28px; }
  .detail-company { font-size: 20px; }
}

/* ===== Mobile ===== */
@media (max-width: 600px) {
  .timeline, .timeline.has-detail { grid-template-columns: 1fr; gap: 12px; }
  .tl-list { grid-template-columns: 1fr; grid-template-rows: none; grid-auto-flow: row; }
  .tl-item { padding: 8px 8px; gap: 12px; }
  .tl-left { width: 44px; }
  .tl-year { font-size: 10px; }
  .tl-place { font-size: 13px; }
  .tl-role { font-size: 9px; }
  .tl-domain { font-size: 7px; }
  .tl-dot { width: 8px; height: 8px; }

  .tl-list.collapsed { max-height: 60px; overflow: hidden; }
  .detail-top { padding: 14px 14px 0; gap: 8px; }
  .detail-year { font-size: 24px; }
  .detail-company { font-size: 18px; }
  .detail-body { padding: 12px 14px 14px; gap: 12px; }
  .detail-text { font-size: 12px; }
  .detail-tag { font-size: 9px; padding: 3px 7px; }
  .detail-nav { padding: 8px 10px 0; }
  .detail-nav-btn, .detail-close { width: 24px; height: 24px; font-size: 11px; }
}
</style>
