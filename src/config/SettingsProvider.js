import settings from "./settings.json"

class SettingsProvider {
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
    }
}

SettingsProvider.init()

export default SettingsProvider