import Object from "../Object.js"

class State extends Object {
    constructor(defaultValues) {
        super(defaultValues)

        this.hasOutput = true
    }
}

export default State