import Output from "../Output.js"

const steps = 10

class TimingDiagramm extends Output {
    constructor(values) {
        super(values)
    }

    generateData = () => {
        const data = this.objects.map(() => [])

        for(let i = 0; i < steps; i++) {
            
        }

        return data
    }
}

export default TimingDiagramm