import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"
import SettingsProvider from "src/config/SettingsProvider.js"

export default () => {
    const container = document.createElement("div")

    // Seperate settings into sections
    const sections = {}

    for(let settingName in SettingsProvider.settings) {
        const setting = SettingsProvider.settings[settingName]

        if(!sections[setting.section]) {
            sections[setting.section] = []
        }

        sections[setting.section].push({
            type: "setting",
            name: settingName
        })
    }

    // Create final Dialog fields using sections
    const fields = [{
        type: "title",
        value: Strings["Settings"]
    }]

    for(let sectionName in sections) {
        fields.push({
            type: "subtitle",
            value: Strings["Settings.Sections." + sectionName]
        })

        fields.push(...sections[sectionName])
    }

    fields.push({
        type: "submit",
        value: Strings["Settings.Close"]
    })

    ReactDOM.render(
        <Dialog
            fields={fields}
            onSubmit={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}