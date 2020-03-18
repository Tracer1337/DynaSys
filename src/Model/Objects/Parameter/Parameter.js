import Object from "../Object.js"

class Parameter extends Object {
    constructor(defaultValues) {
        super(defaultValues)

        this.hasInput = false
        this.hasOutput = true
    }

    feedForward({data, t}) {
        if(data[this.id]) {
            data[this.id][t] = this.getValue()
        }
    }
}

export default Parameter