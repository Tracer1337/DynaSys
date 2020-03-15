const keys = ["name", "value", "inputs", "outputs", "x", "y", "id"]

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
        this.inputs.push(object)
    }

    addOutput(object) {
        this.outputs.push(object)
    }
}

export default Object