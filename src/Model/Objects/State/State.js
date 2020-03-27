import InternalObject from "../InternalObject.js"
import Strings from "src/config/strings.js"
import fix from "src/utils/fix.js"

class State extends InternalObject {
    constructor(defaultValues) {
        super(defaultValues)

        this.type = "State"

        this.hasOutput = true
    }

    getEquation() {
        const equation = `${this.name}.${Strings.Outputs.Summary.New} = ${this.name}.${Strings.Outputs.Summary.Old} + dt * (${this.deltas.map(({ object, sign }) => (sign < 0 ? "- " : "+ ") + object.name).join(" ")})`
        return this.mask(equation)
    }

    evaluate({t, dt}) {
        if(t === 0) {
            this.old = this.getValue({t})
            return this.old
        }

        const delta = this.getDelta({t})
        
        this.new = this.old + dt * delta

        return fix(this.new)
    }
}

export default State