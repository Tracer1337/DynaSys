import Preset1 from "./Preset1.json"
import Preset2 from "./Preset2.json"

import Strings from "src/config/strings.js"

const presets = { Preset1, Preset2 }

for(let name in presets) {
    presets[name].model.forEach(object => {
        const translation = Strings[`Presets.${name}.${object.name}`]
        if(translation) {
            object.name = translation
        }
    })
}

export default presets