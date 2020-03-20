import Output from "../Output.js"
import fix from "src/utils/fix.js"

class TimeTable extends Output {
    constructor(props) {
        super(props)

        this.dt = 0.1
        this.timesteps = 10
    }

    generateData = () => {
        // Create id - value map for objects
        const data = {}
        const model = this.model
        const objects = model.getObjects()

        for (let object of objects) {
            data[object.id] = []

            object.old = 0
        }

        // Generate data table
        for (let t = 0; t < this.timesteps; t += this.dt) {
            t = fix(t)

            // Feed the data through all objects
            for (let object of objects) {
                data[object.id].push(object.evaluate({
                    t, 
                    dt: this.dt, 
                    model
                }))
            }

            // Set the new-value to old-value
            for(let object of objects) {
                if(object.new) {
                    object.old = object.new
                }
            }
        }

        // Return requested objects
        const result = {}

        for(let id in data) {
            if(this.objects.some(object => object.id === parseInt(id))) {
                result[id] = data[id]
            }
        }

        return result
    }
}

export default TimeTable