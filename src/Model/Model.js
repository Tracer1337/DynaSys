class Model {
    constructor() {
        this.model = []
    }

    add(object) {
        this.model.push(object)
    }

    update(id, newValues) {
        const index = this.model.findIndex(object => object.id === id)
        this.model[index].setValues(newValues)
    }

    getObjects() {
        return this.model
    }
}

export default Model