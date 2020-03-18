import * as math from "mathjs"

const keys = ["name", "value", "inputs", "outputs", "x", "y", "id"]

class Object {
    constructor(defaultValues = {}) {
        this.setValues(defaultValues, true)
    }

    setValues(values, setUndefinedValues = false) {
        for(let key of keys) {
            if(values[key] !== undefined || setUndefinedValues) {
                this[key] = values[key]
            }
        }

        if(!this.inputs) {
            this.inputs = []
        }

        if(!this.outputs) {
            this.outputs = []
        }
    }

    addInput(object) {
        this.inputs.push(object)
    }

    addOutput(object) {
        this.outputs.push(object)
    }

    getValue(inputs = this.inputs) {
        const parser = math.parser()

        if(inputs) {
            for(let object of inputs) {
                if(object.hasOutput) {
                    parser.set(object.name, object.getValue())
                }
            }
        }

        const parsedValue = parser.evaluate(this.value || "0")
        return parsedValue
    }

    addValue(value) {
        this.value += ` + ${value}`
    }

    clone() {
        return new this.constructor(this)
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
}

export default Object