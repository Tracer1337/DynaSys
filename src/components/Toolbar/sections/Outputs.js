import React from "react"

import outputs from "../../Outputs/Outputs.js"
import createSection from "./createSection.js"
import Strings from "src/config/strings.js"

const Outputs = ({onOutputClick}) => (
    Object.entries(outputs).map(([type, output]) => (
        <button
            className="item"
            key={type}
            onClick={() => onOutputClick({type})}
        >
            {output.config.label}
        </button>
    ))
)

export default createSection(Outputs, {
    title: Strings.Toolbar.Outputs,
    className: "outputs"
})