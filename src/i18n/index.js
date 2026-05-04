import { reactive, computed } from 'vue';
import en from './en.js';
import ru from './ru.js';

const locales = { en, ru };

const state = reactive({
  locale: 'en',
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
