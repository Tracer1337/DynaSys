import Object from "../Object.js"

class State extends Object {
    constructor(defaultValues) {
        super(defaultValues)

        this.hasOutput = true
    }

    feedForward({data, t}) {
        if(data[this.id][t] === undefined) {
            data[this.id][t] = this.getValue()
        }
    }
}

export default State