import React, { useState } from "react"
import { FormGroup, Input, InputLabel} from "@material-ui/core"

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
                <Input 
                    type="number"
                    value={value}
                    step={setting.step || 1}
                    onChange={handleChange}
                />
            )
            break

        default:
            element = <div>Setting {props.name} not found</div>
            break
    }

    return (
        <FormGroup>
            <InputLabel>{Strings["Settings." + [props.name]]}</InputLabel>

            {element}
        </FormGroup>
    )
}

export default Setting