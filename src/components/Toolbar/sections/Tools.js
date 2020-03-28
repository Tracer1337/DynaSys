import React, { useState, useContext, useEffect } from "react"

import { AppContext } from "src/App.js"
import tools from "../../Tools/Tools.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.js"

const Tools = () => {
    const [selected, setSelected] = useState(null)
    const { onActiveToolChange, activeTool } = useContext(AppContext)

    const handleClick = type => {
        const newSelected = selected === type ? null : type
        setSelected(newSelected)

        onActiveToolChange(newSelected)
    }

    useEffect(() => {
        if(activeTool !== selected) {
            setSelected(activeTool)
        }
    }, [activeTool, selected])

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
    title: Strings["Toolbar.Tools"],
    className: "tools"
})