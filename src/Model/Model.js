import objects from "./Objects/Objects.js"

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
        const filterArray = array => array && array.filter(object => this.getObjectById(object.id))
        
        this.model = this.model.filter(object => {
            // Remove actual object
            if(object.id === id) {
                return false
            }

            // Remove dependencies (e.g. RateOfChange connected to State)
            if(object.type === "RateOfChange") {
                return !hasConnection(object)

            } else if(object.type === "Source" || object.type === "Sink") {
                return !hasConnection(object) && !hasConnection(object.inputs[0]) && !hasConnection(object.outputs[0])
            }

            return true
        })

        // Remove non-existing objects from dependency arrays
        this.model = this.model.map(object => {
            object.inputs = filterArray(object.inputs)
            object.outputs = filterArray(object.outputs)
            object.deltas = filterArray(object.deltas)
            return object
        })

        // Remove those effect who do not have a connection anymore
        this.model = this.model.filter(object => {
            if(object.type === "Effect") {
                const hasInput = object.inputs[0]
                const hasOutput = object.outputs[0]
                return hasInput && hasOutput
            }

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

    toJSON() {
        return JSON.stringify(this.model)
    }

    loadJSON(string) {
        this.model = JSON.parse(string)

        const resolveArray = array => array.map(object => this.getObjectById(object.id))

        this.model = this.model.map(object => new objects[object.type](object))

        this.model.forEach(object => {
            object.inputs = resolveArray(object.inputs)
            object.outputs = resolveArray(object.outputs)
            object.deltas = resolveArray(object.deltas)
        })

        this.model.forEach(object => object.setConnections && object.setConnections())
    }

    reset() {
        this.model = []
    }
}

export default Model