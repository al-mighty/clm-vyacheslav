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

      <component
        v-for="(slide, i) in SLIDES"
        :key="slide.id"
        :is="slideComponents[slide.component]"
        :active="current === i"
        :is-prev="current > i"
        v-bind="slideProps(slide.id)"
        v-on="slideHandlers(slide.id)"
      />
    </main>

    <ClmNavigation
      :current="current"
      :total="totalSlides"
      :is-first="isFirst"
      :is-last="isLast"
      :view-time="slideViewTime"
      :autoplay-progress="autoplayProgress"
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
import InfrastructureSlide from '@/slides/InfrastructureSlide.vue';
import SkillsSlide from '@/slides/SkillsSlide.vue';
import DemosSlide from '@/slides/DemosSlide.vue';
import ContactSlide from '@/slides/ContactSlide.vue';

import { useSlideNav } from '@/composables/useSlideNav.js';
import { SLIDES, TOTAL_SLIDES, TIMELINE_SLUGS } from '@/config/slides.js';

const totalSlides = TOTAL_SLIDES;
const { current, isFirst, isLast, sessionTime, slideViewTime, next, prev, goTo, startAutoplay, autoplayProgress, initialTimelineItem } = useSlideNav(totalSlides);

const slideComponents = {
  CoverSlide, OverviewSlide, PillarsSlide, TimelineSlide, StackSlide,
  CaseSlide, ArchitectureSlide, InfrastructureSlide, SkillsSlide, DemosSlide, ContactSlide,
};

function slideProps(id) {
  if (id === 'timeline') return { initialItem: initialTimelineItem, timelineSlugs: TIMELINE_SLUGS };
  return {};
}

function slideHandlers(id) {
  if (id === 'cover') return { next, autoplay: startAutoplay };
  if (id === 'overview') return { goto: goTo };
  return {};
}

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

/* ===== Mobile ===== */
@media (max-width: 600px) {
  .clm-shell { grid-template-rows: 44px 1fr 48px; }
  .clm-arrow { display: none; }
}

@media (max-height: 500px) and (orientation: landscape) {
  .clm-shell { grid-template-rows: 36px 1fr 40px; }
  .clm-arrow { width: 36px; height: 36px; font-size: 16px; }
}
</style>
