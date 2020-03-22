class Model {
    constructor() {
        this.model = []
    }

    add(object) {
        if(Array.isArray(object)) {
            this.model.push(...object)
        } else {
            this.model.push(object)
        }
    }

    update(id, newValues) {
        const index = this.model.findIndex(object => object.id === id)
        this.model[index].setValues(newValues)
    }

    remove(id) {
        const hasId = object => object && object.id === id
        const hasConnection = object => object && (hasId(object.inputs[0]) || hasId(object.outputs[0]))
        
        this.model = this.model.filter(object => {
            // Remove actual object
            if(object.id === id) {
                return false
            }

            // Remove dependencies (e.g. Effect mounted on the removed object)
            if(object.type === "Effect" || object.type === "RateOfChange") {
                return !hasConnection(object)

            } else if(object.type === "Source" || object.type === "Sink") {
                return !hasConnection(object) && !hasConnection(object.inputs[0]) && !hasConnection(object.outputs[0])
            }

            object.inputs = object.inputs.filter(object => object.id !== id)
            object.outputs = object.outputs.filter(object => object.id !== id)

            return true
        })
    }

    getObjects() {
        return this.model
    }

    getObjectById = id => {
        id = parseInt(id)
        return this.model.find(object => object.id === id)
    }
}

export default Model