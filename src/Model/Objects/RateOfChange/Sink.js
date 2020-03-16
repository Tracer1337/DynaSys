import Object from "../Object.js"

class Sink extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = false
    }
}

export default Sink