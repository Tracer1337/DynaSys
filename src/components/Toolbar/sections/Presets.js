import React, { useContext } from "react"

import { AppContext } from "src/App.js"
import presets from "src/Model/Presets/Presets.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.js"

const Presets = () => {
    const {onModelLoad} = useContext(AppContext)

    return (
        Object.entries(presets).map(([name, json]) => (
            <button
                className={`item`}
                key={name}
                onClick={() => onModelLoad(json)}
            >
                {name}
            </button>
        ))
    )
}

export default createSection(Presets, {
    title: Strings["Toolbar.Presets"],
    className: "presets"
})