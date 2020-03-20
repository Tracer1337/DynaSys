import * as math from "mathjs"
import SettingsProvider from "src/config/SettingsProvider.js"

const keys = ["name", "value", "inputs", "outputs", "x", "y", "id"]

class Object {
    constructor(defaultValues = {}) {
        this.setValues(defaultValues, true)

        this.old = 0
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
        
        if(!this.deltas) {
            this.deltas = []
        }
    }

    addInput(object) {
        this.inputs.push(object)
    }

    addOutput(object) {
        this.outputs.push(object)
    }

    addValue(value) {
        this.value += ` + ${value}`
    }

    addDelta(object, {sign}) {
        this.deltas.push({object, sign})
    }

    getValue() {
        const parser = math.parser()

        for (let object of this.inputs) {
            if (object.hasOutput) {
                parser.set(object.name, object.old)
            }
        }

        const result = parser.evaluate(this.value || "0")
        return +result.toFixed(SettingsProvider.settings.decimalPoints)
    }

    getDelta() {
        let delta = 0

        for (let { object, sign } of this.deltas) {
            delta += object.getValue() * sign
        }

        return delta
    }

    getEquation() {
        return this.value
    }

    evaluate({t}) {
        if (t === 0) {
            this.old = this.getValue()
        }

        return this.old
    }
}

export default Object