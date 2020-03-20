import InternalObject from "../InternalObject.js"

class Parameter extends InternalObject {
    constructor(defaultValues) {
        super(defaultValues)

        this.type = "Parameter"

        this.hasInput = false
        this.hasOutput = true
    }
}

export default Parameter