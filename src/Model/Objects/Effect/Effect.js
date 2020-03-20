import InternalObject from "../InternalObject.js"

class Effect extends InternalObject {
    constructor(defaultValues) {
        super(defaultValues)

        this.type = "Effect"
        
        if(!this.inputs[0].outputs.includes(this.outputs[0])) {
            this.inputs[0].addOutput(this.outputs[0])
        }

        if(!this.outputs[0].inputs.includes(this.inputs[0])) {
            this.outputs[0].addInput(this.inputs[0])
        }

        this.hasOutput = false
    }
}

export default Effect