import Output from "../Output.js"

class TimingDiagramm extends Output {
    constructor(values) {
        super(values)
    }

    getTimeSteps() {
        return 10
    }

    generateData = () => {
        // Create id - value map for objects
        const data = {}

        for(let object of this.objects) {
            data[object.id] = [object.getValue()]
        }

        // Generate data table
        for(let t = 1; t < this.getTimeSteps(); t++) {

            // Feed the data through all objects
            for(let object of this.model.getObjects()) {

                if(!object.feedForward) {
                    continue
                }

                object.feedForward(data, t)
            }
        }

        return data
    }
}

export default TimingDiagramm