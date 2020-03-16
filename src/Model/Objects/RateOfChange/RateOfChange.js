import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = true
    }

    calculateDeltas(t) {
        const deltas = {[this.id]: null}

        for(let object of [...this.inputs, ...this.outputs]) {
            deltas[object.id] = 0
        }

        const delta = this.getValue()

        deltas[this.id] = 0

        for (let input of this.inputs) {
            if (input.constructor.name !== "Source") {
                deltas[input.id] = -delta
            }
        }

        for (let output of this.outputs) {
            if (output.constructor.name !== "Sink") {
                deltas[output.id] = delta
            }
        }

        return deltas
    }
}

export default RateOfChange