import Object from "../Object.js"

class RateOfChange extends Object {
    constructor(defaultValue) {
        super(defaultValue)
    }

    calculateValues(t) {
        const data = {[this.id]: null}

        for(let object of [...this.inputs, ...this.outputs]) {
            data[object.id] = 0
        }

        const newValue = this.value * t

        data[this.id] = this.value

        for (let input of this.inputs) {
            if (input.constructor.name !== "Source") {
                data[input.id] = input.value - newValue
            }
        }

        for (let output of this.outputs) {
            if (output.constructor.name !== "Sink") {
                data[output.id] = output.value + newValue
            }
        }

        return data
    }
}

export default RateOfChange