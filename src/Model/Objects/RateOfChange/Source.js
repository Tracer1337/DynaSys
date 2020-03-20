import InternalObject from "../InternalObject.js"

class Source extends InternalObject {
    constructor(defaultValue) {
        super(defaultValue)

        this.type = "Source"
        
        this.hasOutput = false
    }
}

export default Source