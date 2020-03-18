import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = true
    }

    feedForward({data, t}) {
        const delta = this.getValue()
        console.log(delta)

        // Subtract delta from the inputs value
        const input = this.inputs[0]

        if (input.constructor.name !== "Source") {
            input.addValue(-delta)
            if(data[input.id]) {
                data[input.id][t] = input.getValue()
            }
        }

        // Add delta to the outputs value
        const output = this.outputs[0]

        if (output.constructor.name !== "Sink") {
            output.addValue(delta)
            if (data[output.id]) {
                data[output.id][t] = output.getValue()
            }
        }

        // Calculate the delta
        if(data[this.id]) {
            const nextDelta = this.getValue()
            data[this.id][t] = nextDelta
        }
    }
}

export default RateOfChange