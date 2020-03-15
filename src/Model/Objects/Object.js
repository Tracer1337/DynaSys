const keys = ["name", "value", "input", "output", "x", "y", "id"]

class Object {
    constructor(defaultValues = {}) {
        this.setValues(defaultValues, true)
    }

    setValues(values, setUndefinedValues = false) {
        for(let key of keys) {
            if(values[key] || setUndefinedValues) {
                this[key] = values[key]
            }
        }
    }

    addInput(object) {
        this.input.push(object)
    }

    addOutput(object) {
        this.output.push(object)
    }
}

export default Object