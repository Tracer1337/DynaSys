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
            // Settings the values for t to the previous ones (t - 1)
            for(let id in data) {
                data[id][t] = data[id][t - 1]
            }

            // Adding deltas to the values for t
            for(let object of this.model.getObjects()) {
                if(!object.calculateDeltas) {
                    continue
                }
                
                const deltas = object.calculateDeltas(t, data)

                for(let id in deltas) {
                    if(data[id]) {
                        data[id][t] += deltas[id]
                    }
                }
            }
        }

        return data
    }
}

export default TimingDiagramm