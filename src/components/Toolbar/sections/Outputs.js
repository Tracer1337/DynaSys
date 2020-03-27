import React, { useContext } from "react"

import { AppContext } from "src/App.js"
import outputs from "../../Outputs/Outputs.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.js"

const Outputs = () => {
    const { onOutputCreate } = useContext(AppContext)

    return (
        Object.entries(outputs).map(([type, output]) => (
            <button
                className="item"
                key={type}
                onClick={() => onOutputCreate({type})}
            >
                {output.config.label}
            </button>
        ))
    )
}

export default createSection(Outputs, {
    title: Strings.Toolbar.Outputs,
    className: "outputs"
})