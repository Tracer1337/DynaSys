import InternalObject from "../InternalObject.js"

class Sink extends InternalObject {
    constructor(defaultValue) {
        super(defaultValue)

        this.type = "Sink"

        this.hasOutput = false
    }
}

export default Sink