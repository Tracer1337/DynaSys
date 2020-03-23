import React, { useState } from "react"

import tools from "../../Tools/Tools.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.json"

const Tools = ({onActiveToolChange, setClearToolSelection}) => {
    const [selected, setSelected] = useState(null)

    const handleClick = type => {
        const newSelected = selected === type ? null : type
        setSelected(newSelected)

        onActiveToolChange(newSelected)
    }

    setClearToolSelection(() => setSelected(null))

    return Object.entries(tools).map(([type, tool]) => !tool.config.hideInToolbar && (

        <button
            className={`item ${selected === type ? "selected" : ""}`}
            key={type}
            onClick={() => handleClick(type)}
        >
            {tool.config.label}
        </button>

    ))
}

export default createSection(Tools, {
    title: Strings.Toolbar.Tools,
    className: "tools"
})