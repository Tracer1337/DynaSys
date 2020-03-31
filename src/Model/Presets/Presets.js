import Tourism from "./Tourism.json"
import Aids from "./Aids.json"

import Strings from "src/config/strings.js"

const presets = { Tourism, Aids }

for(let name in presets) {
    presets[name].name = Strings[`Presets.${name}`]

    presets[name].model.forEach(object => {
        object.name = Strings[`Presets.${name}.${object.name}`]
    })
}

export default presets