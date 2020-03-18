import Output from "../Output.js"

class TimeTable extends Output {
    getTimeSteps() {
        return 10
    }

    generateData = () => {
        // Create id - value map for objects
        const data = {}
        const clonedObjects = this.model.clone().getObjects()

        for (let object of this.objects) {
            data[object.id] = [object.getValue()]
        }

        // Generate data table
        for (let t = 1; t < this.getTimeSteps(); t++) {

            // Feed the data through all objects
            for (let object of clonedObjects) {

                if (!object.feedForward) {
                    continue
                }

                object.feedForward({
                    objects: clonedObjects,
                    data,
                    t
                })
            }
        }

        return data
    }
}

export default TimeTable