import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = true
    }

    getInputsForData(data, t) {
        return this.inputs.map(input => {
            if (!data[input.id]) {
                return input
            }
            const newInput = input.clone()
            newInput.value = data[input.id][t - 1]
            return newInput
        })
    }

    feedForward(data, t) {
        // Create new inputs for calculating the value from the current data
        const newInputs = this.getInputsForData(data, t)

        const delta = this.getValue(newInputs)

        // Subtract delta from the inputs value
        for (let input of this.inputs) {
            if (input.constructor.name !== "Source") {
                if(data[input.id]) {
                    data[input.id][t] = data[input.id][t-1] - delta
                }
            }
        }

        // Add delta to the outputs value
        for (let output of this.outputs) {
            if (output.constructor.name !== "Sink") {
                if (data[output.id]) {
                    data[output.id][t] = data[output.id][t-1] + delta
                }
            }
        }

        // Calculate the delta
        const nextDelta = this.getValue(this.getInputsForData(data, t + 1))
        data[this.id][t] = nextDelta
    }
}

export default RateOfChange