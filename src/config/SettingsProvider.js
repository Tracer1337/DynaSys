import settings from "./settings.json"

export default class SettingsProvider {
    static settings = settings

    static set = (key, value) => {
        const setting = SettingsProvider.settings[key]

        if(setting.type === "number") {
            setting.value = parseFloat(value)
        } else {
            setting.value = value
        }
    }
}