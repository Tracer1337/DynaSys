import getSearchParam from "../utils/getSearchParam.js"

import de from "./lang/de.json"
import en from "./lang/en.json"

const defaultLang = "de"

const languages = {de, en}
const strings = languages[getSearchParam("lang") || defaultLang]

if(!strings) {
    throw new Error("The language '"+getSearchParam("lang")+"' is not supported")
}

export default strings

export {
    languages,
    defaultLang
}