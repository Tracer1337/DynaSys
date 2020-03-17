import Object from "../Object.js"

class Effect extends Object {
    constructor(defaultValues) {
        super(defaultValues)
        
        this.inputs[0].addOutput(this.outputs[0])
        this.outputs[0].addInput(this.inputs[0])

        this.hasOutput = false
    }
}

export default Effect