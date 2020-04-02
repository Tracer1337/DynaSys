import settings from "./settings.json"

class SettingsProvider {
    /**
     * Event-related methods
     */

    static listeners = []
    
    static addEventListener(type, fn) {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }

        this.listeners[type].push(fn)
    }

    static removeEventListener(type, fn) {
        this.listeners[type] = this.listeners[type].filter(l => l !== fn)

        if (this.listeners[type].length === 0) {
            delete this.listeners[type]
        }
    }

    static dispatchEvent(event) {
        if (!this.listeners[event.type]) {
            return
        }

        this.listeners[event.type].forEach(fn => fn(event))
    }

    /**
     * Setting-related methods
     */

    static getStoredSettings() {
        return JSON.parse(localStorage.getItem("settings"))
    }

    static init() {
        SettingsProvider.settings = settings
        const storedSettings = SettingsProvider.getStoredSettings()

        for(let key in storedSettings) {
            if(SettingsProvider.settings[key]) {
                SettingsProvider.settings[key] = storedSettings[key]
            }
        }
    }

    static storeSettings(key, setting) {
        let storedSettings = SettingsProvider.getStoredSettings()

        if(!storedSettings) {
            storedSettings = {}
        }

        storedSettings[key] = setting

        const newValue = JSON.stringify(storedSettings)
        localStorage.setItem("settings", newValue)
    }

    static set(key, value) {
        const setting = SettingsProvider.settings[key]
        
        if (setting.type === "number") {
            setting.value = parseFloat(value)
        } else {
            setting.value = value
        }

        SettingsProvider.storeSettings(key, setting)
        SettingsProvider.dispatchEvent(new CustomEvent("change", { detail: { key, value } }))
    }
}

SettingsProvider.init()

export default SettingsProvider