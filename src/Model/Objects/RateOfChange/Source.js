import Object from "../Object.js"

class Source extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = false
    }
}

export default Source