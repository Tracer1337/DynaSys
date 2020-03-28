const fs = require("fs")

const firstLang = process.argv[2]
const secondLang = process.argv[3]

if(!firstLang || !secondLang) {
    console.error("Two languages required for comparison")
    process.exit()
}

const getFile = code => JSON.parse(fs.readFileSync(`${__dirname}\\${code}.json`, "utf8"))

const firstObject = getFile(firstLang)
const secondObject = getFile(secondLang)

const diff = []

for(let key in firstObject) {
    if(!(key in secondObject)) {
        diff.push(key)
    }
}

if(diff.length > 0) {
    console.log(`Following keys are in ${firstLang}.json but not in ${secondLang}.json:\n`)
    diff.forEach(key => console.log(key))
} else {
    console.log(`All keys from ${firstLang}.json are also in ${secondLang}.json`)
}