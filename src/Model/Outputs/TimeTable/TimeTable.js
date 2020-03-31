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
        // Create a new array since it will become sorted
        const objects = [...model.getObjects()]

        for (let object of objects) {
            data[object.id] = []

            object.old = 0
            object.new = 0
        }

        // Put "State" objects to the beginning so that they will be calculated first
        const isState = obj => obj.type === "State"
        objects.sort((a, b) => {
            const aIsState = isState(a)
            const bIsState = isState(b)

            if(aIsState && !bIsState) return -1
            if(!aIsState && bIsState) return 1
            else return 0
        })

        // Generate data table
        for (let t = 0; t <= this.timesteps; t += this.dt) {
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