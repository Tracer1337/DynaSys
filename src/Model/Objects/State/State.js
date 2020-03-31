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
        const leftSide = this.mask(`${this.name}.${Strings["Outputs.Summary.New"]}`)
        const rightSide = this.mask(`${this.name}.${Strings["Outputs.Summary.Old"]} + dt * (${this.deltas.map(({ object, sign }) => (sign < 0 ? "- " : "+ ") + object.name).join(" ")})`)
        return [leftSide, rightSide]
    }

    evaluate({t, dt}) {
        if(t === 0) {
            this.old = this.getValue({t})
            return this.old
        }

        const delta = this.getDelta({t: t-1})
        
        this.new = this.old + dt * delta

        return fix(this.new)
    }
}

export default State