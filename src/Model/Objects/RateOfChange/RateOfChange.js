import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)

        this.hasOutput = true
    }

    calculateDeltas(t, data) {
        const deltas = {[this.id]: null}

        for(let object of [...this.inputs, ...this.outputs]) {
            deltas[object.id] = 0
        }

        // Create new inputs for calculating the value from the current data
        const newInputs = this.inputs.map(input => {
            console.log({input, data})
            if(!data[input.id]) {
                return input
            }
            const newInput = input.clone()
            newInput.value = data[input.id][t]
            console.log({newInput})
            return newInput
        })

        const delta = this.getValue(newInputs)
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