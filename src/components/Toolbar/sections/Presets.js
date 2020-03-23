import React from "react"

import presets from "src/Model/Presets/Presets.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.json"

const Presets = ({onModelLoad}) => (
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

export default createSection(Presets, {
    title: Strings.Toolbar.Presets,
    className: "presets"
})