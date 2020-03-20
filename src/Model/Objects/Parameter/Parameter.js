import Object from "../Object.js"

class Parameter extends Object {
    constructor(defaultValues) {
        super(defaultValues)

        this.hasInput = false
        this.hasOutput = true
    }
}

export default Parameter