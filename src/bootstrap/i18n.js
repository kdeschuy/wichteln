import Vue from 'vue'
import VueI18n from 'vue-i18n'

import defaultMessages from '@/assets/translations/home/en.yaml'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en: defaultMessages } // set locale messages
})

// We keep a map of loaded translations to make sure we don't load them again
const loadedRouteTranslations = {
  'home': ['en']
}

// Helper function to determine if route-specific translations have been loaded.
function areRouteTranslationsLoaded (route, lang) {
  const cached = loadedRouteTranslations[route]
  return cached && cached.includes(lang)
}

function cacheRouteTranslation (route, lang) {
  const cached = loadedRouteTranslations[route]
  if (cached) {
    cached.push(lang)
  } else {
    loadedRouteTranslations[route] = [lang]
  }
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  // TODO Modify components which require knowledge of language here
  // axios.defaults.headers.common['Accept-Language'] = lang
  // document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export default i18n

export async function loadRouteTranslations (route, lang) {
  // Immediately return if the language is already set and the route-specific translations have already been loaded.
  const alreadyLoaded = areRouteTranslationsLoaded(route, lang)
  if (i18n.locale === lang && alreadyLoaded) { return }

  // If they are not loaded yet, dynamically import the webpack chunk.
  if (!alreadyLoaded) {
    const msgs = await import(/* webpackChunkName: 'lang-[request]' */ `@/assets/translations/${route}/${lang}.yaml`)
    i18n.mergeLocaleMessage(lang, msgs.default)
    cacheRouteTranslation(route, lang)
  }

  // Correctly set the language across all components in the app.
  return setI18nLanguage(lang)
}
