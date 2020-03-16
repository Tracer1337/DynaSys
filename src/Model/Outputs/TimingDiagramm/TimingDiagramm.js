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
            data[object.id] = []
        }

        // Generate data table
        for(let t = 0; t < this.getTimeSteps(); t++) {
            for(let object of this.model.getObjects()) {
                if(!object.calculateValues) {
                    continue
                }
                
                const newData = object.calculateValues(t)

                for(let id in newData) {
                    if(data[id]) {
                        data[id][t] = newData[id]
                    }
                }
            }
        }

        return data
    }
}

export default TimingDiagramm