import React, { useState, useContext, useEffect } from "react"

import IconButton from "../components/IconButton.js"

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

        <IconButton
            onClick={() => handleClick(type)}
            icon={tool.config.icon}
            label={tool.config.label}
            color={selected === type ? "secondary" : "default"}
            key={type}
        />
        
    ))
}

export default createSection(Tools, {
    title: Strings["Toolbar.Tools"],
    className: "tools"
})