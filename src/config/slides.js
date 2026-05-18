// Single source of truth for slide order, ids, titles.
// Imported by App.vue, useSlideNav.js, and scripts/veeva-pack.js (Node ESM).

export const SLIDES = [
  { id: 'cover',          component: 'CoverSlide',          title: 'Cover' },
  { id: 'overview',       component: 'OverviewSlide',       title: 'Overview Menu' },
  { id: 'pillars',        component: 'PillarsSlide',        title: 'Three Pillars' },
  { id: 'timeline',       component: 'TimelineSlide',       title: 'Career Timeline' },
  { id: 'stack',          component: 'StackSlide',          title: 'Tech Stack' },
  { id: 'case',           component: 'CaseSlide',           title: 'Case Dom.ru' },
  { id: 'architecture',   component: 'ArchitectureSlide',   title: 'Architecture Interactive' },
  { id: 'infrastructure', component: 'InfrastructureSlide', title: 'Personal Production Infra' },
  { id: 'skills',         component: 'SkillsSlide',         title: 'Tooling Spectrum' },
  { id: 'demos',          component: 'DemosSlide',          title: 'Demos' },
  { id: 'contact',        component: 'ContactSlide',        title: 'Contact' },
];

export const TIMELINE_SLUGS = [
  'elementarno', 'intercomp', 'space307', 'futurecomes', 'citydrive',
  'lanck', 'domru', 'heropayments', 'bcharge', 'sber',
];

export const TOTAL_SLIDES = SLIDES.length;
export const SLIDE_NAMES = SLIDES.map(s => s.id);
export const slideNum = (i) => String(i + 1).padStart(2, '0');
