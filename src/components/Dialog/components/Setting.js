import React, { useState } from "react"
import SettingsProvider from "src/config/SettingsProvider.js"
import Strings from "src/config/strings.js"

const Setting = (props) => {
    const setting = SettingsProvider.settings[props.name]

    const [value, setValue] = useState(setting.value)

    const handleChange = (event) => {
        SettingsProvider.set(props.name, event.target.value)
        setValue(event.target.value)
    }

    let element

    switch(setting.type) {
        case "number":
            element = (
                <div className="number">
                    <input type="number" value={value} step={setting.step || 1} onChange={handleChange}/>
                </div>
            )
            break

        default:
            element = <div>Setting {props.name} not found</div>
            break
    }

    return (
        <div className="setting">
            <label>{Strings.Settings[props.name]}</label>
            {element}
        </div>
    )
}

export default Setting