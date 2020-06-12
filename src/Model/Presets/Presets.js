import Tourism from "./Tourism.json"
import Pandemic from "./Pandemic.json"
import ImperialTieFighter from "./Imperial Tie-Fighter.json"

import Strings, { languages } from "src/config/strings.js"

const presets = [Tourism, Pandemic, ImperialTieFighter]

for(let preset of presets) {
    const {name} = preset
    preset.name = Strings[`Presets.${name}`] || preset.name

    // Get all possible origin for this preset (assuming the origin language is english)
    const originStrings = {}
    const originStringsSorted = []
    for (let key in languages.en) {
        if (key.includes(`Presets.${name}`)) {
            originStrings[key] = languages.en[key]
            originStringsSorted.push(languages.en[key])
        }
    }

    // Sort strings by the longest first
    originStringsSorted.sort((a, b) => b.length - a.length)
    
    // Insert translations
    preset.model.forEach(object => {
        // Translate name
        object.name = Strings[`Presets.${name}.${object.name}`] || object.name

        // Translate names in object's value 
        if(object.value) {
            originStringsSorted.forEach(string => {
                // Replace occurance in target with the translation
                const key = Object.entries(originStrings).find(e => e[1] === string)[0]
                object.value = object.value.replace(new RegExp(string, "g"), Strings[key])
            })
        }
    })
}

export default presets