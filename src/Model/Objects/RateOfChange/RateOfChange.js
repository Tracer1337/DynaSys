import InternalObject from "../InternalObject.js"

class RateOfChange extends InternalObject {
    constructor(defaultValue) {
        super(defaultValue)

        this.type = "RateOfChange"

        this.hasOutput = true
        this.providesConnection = true

        this.setConnections()
    }

    setConnections() {
        if(!this.inputs[0].type || !this.outputs[0].type) {
            return
        }

        if(!this.inputs[0].deltas.some(delta => delta.object.id === this.id)) {
            this.inputs[0].addDelta(this, { sign: -1 })
        }

        if(!this.outputs[0].deltas.some(delta => delta.object.id === this.id)) {
            this.outputs[0].addDelta(this, { sign: 1 })
        }

        if(this.inputs[0].type === "Source") {
            this.inputs[0].outputs[0] = this
        }

        if(this.outputs[0].type === "Sink") {
            this.outputs[0].inputs[0] = this
        }
    }

    // evaluate(data) {
    //     const value = this.getValue(data)
    //     return value
    // }
}

export default RateOfChange