import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = true

        if(this.inputs[0].addDelta && !this.inputs[0].deltas.includes(this)) {
            this.inputs[0].addDelta(this, {sign: -1})
        }

        if(this.outputs[0].addDelta && !this.outputs[0].deltas.includes(this)) {
            this.outputs[0].addDelta(this, {sign: 1})
        }
    }

    evaluate() {
        const value = this.getValue()
        return value
    }
}

export default RateOfChange