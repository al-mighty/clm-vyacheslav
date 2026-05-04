<template>
  <div class="clm-shell">
    <!-- Background parallax orbs -->
    <div class="bg-parallax" :style="bgStyle">
      <div class="bg-orb bg-orb--1" />
      <div class="bg-orb bg-orb--2" />
      <div class="bg-orb bg-orb--3" />
      <div class="bg-line bg-line--h" />
      <div class="bg-line bg-line--v" />
    </div>

    <ClmTopbar :session-time="sessionTime" :current="current" :total="totalSlides" />

    <main class="slide-stage">
      <button class="clm-arrow left" :disabled="isFirst" @click="prev">&lsaquo;</button>
      <button class="clm-arrow right" :disabled="isLast" @click="next">&rsaquo;</button>

      <CoverSlide       :active="current === 0" :is-prev="current > 0" @next="next" />
      <OverviewSlide     :active="current === 1" :is-prev="current > 1" @goto="goTo" />
      <PillarsSlide      :active="current === 2" :is-prev="current > 2" />
      <TimelineSlide     :active="current === 3" :is-prev="current > 3" />
      <StackSlide        :active="current === 4" :is-prev="current > 4" />
      <CaseSlide         :active="current === 5" :is-prev="current > 5" />
      <ArchitectureSlide :active="current === 6" :is-prev="current > 6" />
      <SkillsSlide       :active="current === 7" :is-prev="current > 7" />
      <ContactSlide      :active="current === 8" :is-prev="current > 8" />
    </main>

    <ClmNavigation
      :current="current"
      :total="totalSlides"
      :is-first="isFirst"
      :is-last="isLast"
      :view-time="slideViewTime"
      @prev="prev"
      @next="next"
      @goto="goTo"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ClmTopbar from '@/components/ClmTopbar.vue';
import ClmNavigation from '@/components/ClmNavigation.vue';

import CoverSlide from '@/slides/CoverSlide.vue';
import OverviewSlide from '@/slides/OverviewSlide.vue';
import PillarsSlide from '@/slides/PillarsSlide.vue';
import TimelineSlide from '@/slides/TimelineSlide.vue';
import StackSlide from '@/slides/StackSlide.vue';
import CaseSlide from '@/slides/CaseSlide.vue';
import ArchitectureSlide from '@/slides/ArchitectureSlide.vue';
import SkillsSlide from '@/slides/SkillsSlide.vue';
import ContactSlide from '@/slides/ContactSlide.vue';

import { useSlideNav } from '@/composables/useSlideNav.js';

const totalSlides = 9;
const { current, isFirst, isLast, sessionTime, slideViewTime, next, prev, goTo } = useSlideNav(totalSlides);

// Background parallax — orbs shift based on slide index
const bgStyle = computed(() => {
  const progress = current.value / (totalSlides - 1); // 0..1
  return {
    transform: `translate(${-progress * 120}px, ${-progress * 60}px)`,
  };
});
</script>

<style>
#app {
  position: relative;
  height: 100vh;
  z-index: 2;
}
.clm-shell {
  height: 100vh;
  display: grid;
  grid-template-rows: 56px 1fr 64px;
  position: relative;
  overflow: hidden;
}

/* ===== Background parallax layer ===== */
.bg-parallax {
  position: fixed;
  inset: -100px;
  z-index: 0;
  pointer-events: none;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.bg-orb--1 {
  width: 600px; height: 600px;
  background: rgba(212, 255, 58, 0.12);
  top: -15%; left: 5%;
}
.bg-orb--2 {
  width: 500px; height: 500px;
  background: rgba(255, 91, 58, 0.10);
  bottom: -5%; right: 0%;
}
.bg-orb--3 {
  width: 450px; height: 450px;
  background: rgba(100, 150, 255, 0.08);
  top: 35%; left: 50%;
}

/* Diagonal accent lines */
.bg-line {
  position: absolute;
  opacity: 0.5;
}
.bg-line--h {
  width: 200%; height: 1px;
  top: 38%; left: -50%;
  transform: rotate(-2deg);
  background: linear-gradient(90deg, transparent 0%, rgba(212, 255, 58, 0.08) 30%, rgba(255, 91, 58, 0.06) 70%, transparent 100%);
}
.bg-line--v {
  width: 1px; height: 200%;
  left: 72%; top: -50%;
  transform: rotate(3deg);
  background: linear-gradient(180deg, transparent 0%, rgba(100, 150, 255, 0.08) 40%, rgba(212, 255, 58, 0.06) 70%, transparent 100%);
}

/* Slide stage above background */
.slide-stage {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.clm-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px; height: 56px;
  background: rgba(10, 14, 26, 0.7);
  border: 1px solid var(--line-2);
  color: var(--ink);
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}
.clm-arrow:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.clm-arrow:disabled { opacity: 0; pointer-events: none; }
.clm-arrow.left { left: 24px; }
.clm-arrow.right { right: 24px; }
</style>
