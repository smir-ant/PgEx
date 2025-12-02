import { locales } from './locales.js';

export class Localization {
    constructor() {
        this.locales = locales;
        this.currentLang = localStorage.getItem('pgex_lang') || 'ru';
        this.listeners = [];
    }

    toggleLanguage() {
        this.setLanguage(this.currentLang === 'ru' ? 'en' : 'ru');
    }

    setLanguage(lang) {
        if (!this.locales[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('pgex_lang', lang);
        this.updatePage();
        this.notifyListeners();
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.locales[this.currentLang];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        // Simple interpolation
        if (typeof value === 'string') {
            for (const [param, replacement] of Object.entries(params)) {
                value = value.replace(`{${param}}`, replacement);
            }
        }

        return value;
    }

    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            // Check if we should update innerHTML (if translation contains HTML tags)
            if (translation.includes('<') && translation.includes('>')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Update html lang attribute
        document.documentElement.lang = this.currentLang;
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.currentLang));
    }
}
