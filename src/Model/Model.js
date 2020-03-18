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

    getObjects() {
        return this.model
    }

    getObjectById = id => {
        id = parseInt(id)
        return this.model.find(object => object.id === id)
    }

    clone() {
        const newModel = new Model()

        // Shallow clone of all objects
        newModel.model = this.model.map(object => object.clone())

        // Set the inputs and outputs of the cloned objects to the new cloned objects
        for(let object of newModel.model) {
            object.inputs = []

            this.getObjectById(object.id).inputs.forEach((input, index) => {
                object.inputs[index] = newModel.getObjectById(input.id)
            })
    
            object.outputs = []
    
            this.getObjectById(object.id).outputs.forEach((output, index) => {
                object.outputs[index] = newModel.getObjectById(output.id)
            })

        }

        return newModel
    }
}

export default Model