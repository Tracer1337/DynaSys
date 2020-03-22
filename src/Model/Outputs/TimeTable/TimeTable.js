import Output from "../Output.js"
import fix from "src/utils/fix.js"
import SettingsProvider from "src/config/SettingsProvider.js"

class TimeTable extends Output {
    constructor(props) {
        super(props)

        this.dt = SettingsProvider.settings.interval.value
        this.timesteps = SettingsProvider.settings.timesteps.value
    }

    generateData = () => {
        // Create id - value map for objects
        const data = {}
        const model = this.model
        const objects = model.getObjects()

        for (let object of objects) {
            data[object.id] = []

            object.old = 0
            object.new = 0
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

        console.log(data)

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