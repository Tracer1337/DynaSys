import Object from "../Object.js"
import Strings from "src/config/strings.json"
import fix from "src/utils/fix.js"

class State extends Object {
    constructor(defaultValues) {
        super(defaultValues)

        this.hasOutput = true
    }

    getEquation() {
        return `${this.name}.${Strings.Outputs.Summary.New} = ${this.name}.${Strings.Outputs.Summary.Old} + dt * (${this.deltas.map(({ object, sign }) => (sign < 0 ? "- " : "+ ") + object.name).join(" ")})`
    }

    evaluate({t, dt}) {
        if(t === 0) {
            this.old = this.getValue()
            return this.old
        }
        
        const delta = this.getDelta()
        
        this.new = this.old + dt * delta

        return fix(this.new)
    }
}

export default State