import React, { useContext } from "react"

import IconButton from "../components/IconButton.js"

import { AppContext } from "src/App.js"
import outputs from "../../Outputs/Outputs.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.js"

const Outputs = () => {
    const { onOutputCreate } = useContext(AppContext)

    return (
        Object.entries(outputs).map(([type, output]) => (

            <IconButton
                key={type}
                onClick={() => onOutputCreate({type})}
                icon={output.config.icon}
                label={output.config.label}
            />
            
        ))
    )
}

export default createSection(Outputs, {
    title: Strings["Toolbar.Outputs"],
    className: "outputs"
})