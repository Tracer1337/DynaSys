import Tourism from "./Tourism.json"
import Pandemic from "./Pandemic.json"

import Strings from "src/config/strings.js"

const presets = [Tourism, Pandemic]

for(let preset of presets) {
    const {name} = preset
    preset.name = Strings[`Presets.${name}`]

    preset.model.forEach(object => {
        object.name = Strings[`Presets.${name}.${object.name}`]
    })
}

export default presets