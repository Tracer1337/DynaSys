import InternalObject from "../InternalObject.js"

class RateOfChange extends InternalObject {
    constructor(defaultValue) {
        super(defaultValue)

        this.type = "RateOfChange"

        this.hasOutput = true

        if(this.inputs[0].addDelta && !this.inputs[0].deltas.includes(this)) {
            this.inputs[0].addDelta(this, {sign: -1})
        }

        if(this.outputs[0].addDelta && !this.outputs[0].deltas.includes(this)) {
            this.outputs[0].addDelta(this, {sign: 1})
        }

        if(this.inputs[0].type === "Source") {
            this.inputs[0].outputs[0] = this
        }

        if (this.outputs[0].type === "Sink") {
            this.outputs[0].inputs[0] = this
        }
    }

    evaluate({t}) {
        const value = this.getValue({t})
        return value
    }
}

export default RateOfChange