import { reactive, computed } from 'vue';
import en from './en.js';
import ru from './ru.js';

const locales = { en, ru };

function detectLocale() {
  const lang = (navigator.language || '').split('-')[0];
  return lang === 'ru' ? 'ru' : 'en';
}

const state = reactive({
  locale: detectLocale(),
});

export function useI18n() {
  const t = computed(() => locales[state.locale]);
  const locale = computed(() => state.locale);

  function setLocale(lang) {
    if (locales[lang]) state.locale = lang;
  }

  function toggleLocale() {
    state.locale = state.locale === 'en' ? 'ru' : 'en';
  }

  return { t, locale, setLocale, toggleLocale };
}
