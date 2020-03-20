import SettingsProvider from "src/config/SettingsProvider.js"

export default nr => +nr.toFixed(SettingsProvider.settings.decimalPoints)