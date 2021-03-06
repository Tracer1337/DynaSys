import React, { useEffect, useState, useContext } from "react"
import SendIcon from "@material-ui/icons/Send"

import IconButton from "../components/IconButton.js"

import { AppContext } from "src/App.js"
import presets from "src/Model/Presets/Presets.js"
import createSection from "./createSection.js"
import { getModels } from "src/utils/storage.js"
import Strings from "src/config/strings.js"

const Presets = () => {
    const [models, setModels] = useState(getModels())
    const { onModelLoad, addEventListener, removeEventListener } = useContext(AppContext)

    const handleModelChange = () => {
        setModels(getModels())
    }

    useEffect(() => {
        addEventListener("modelschange", handleModelChange)
        return () => removeEventListener("modelschange", handleModelChange)
    }, [])

    return (
        <>
            {presets.map((object, i) => (
                <IconButton
                    key={i}
                    onClick={() => onModelLoad(object)}
                    icon={SendIcon}
                    label={object.name}
                />
            ))}
        
            {models.map((object, i) => (
                <IconButton
                    key={i}
                    onClick={() => onModelLoad(object)}
                    icon={SendIcon}
                    label={object.name}
                />
            ))}
        </>
    )
}

export default createSection(Presets, {
    title: Strings["Toolbar.Presets"],
    className: "presets"
})