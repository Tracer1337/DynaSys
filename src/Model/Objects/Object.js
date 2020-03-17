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

    clone() {
        return new this.constructor(this)
    }
}

export default Object