import { parser as mathParser } from "mathjs"
import SettingsProvider from "src/config/SettingsProvider.js"

const keys = ["name", "value", "inputs", "outputs", "x", "y", "id", "isPresetted", "color"]

class InternalObject {
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

    getValue(data) {
        const parser = mathParser()

        for (let object of this.inputs) {
            if (object.hasOutput) {
                const value = object.type === "State" ? (object.new || object.old) : object.getValue(data)
                parser.set(object.name, value)
            }
        }

        if(data.t !== undefined) {
            parser.set("t", data.t)
        }

        const result = parser.evaluate(this.value || "0")

        // console.log(`[${data.t} - ${this.name}]`, parser, result, this)

        return +result.toFixed(SettingsProvider.settings.decimalPoints.value)
    }

    getDelta(data) {
        let delta = 0

        for (let {object, sign} of this.deltas) {
            delta += object.getValue(data) * sign
        }

        return delta
    }

    mask(string) {
        // Apply colors of objects to string
        let masked = string

        const sortedObjects = [this, ...this.inputs, ...this.outputs, ...this.deltas.map(d => d.object)]
        sortedObjects.sort((a, b) => (b.name || "").length - (a.name || "").length)

        for (let object of sortedObjects) {
            if(!object.name) {
                continue
            }

            const regex = new RegExp(`\w*(?<!}|[A-za-z])${object.name}`, "g")

            masked = masked.replace(regex, `{${object.color || ""}}${object.name}`)
        }

        return masked
    }

    getEquation() {
        const leftSide = this.mask(this.name)
        const rightSide = this.mask(this.value)
        return [leftSide, rightSide]
    }

    evaluate(data) {
        const value = this.getValue(data)
        if(data.t === 0) {
            this.old = value
        }
        return value
    }

    clone() {
        return new this.constructor(this)
    }

    toJSON() {
        return {
            ...this,
            inputs: this.inputs.map(object => ({id: object.id})),
            outputs: this.outputs.map(object => ({id: object.id})),
            deltas: this.deltas.map(object => ({id: object.id}))
        }
    }
}

export default InternalObject