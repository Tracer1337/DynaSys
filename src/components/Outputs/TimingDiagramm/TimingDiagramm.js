import React, { Component } from "react"
import { Line } from "react-chartjs-2"
import ShowChartIcon from "@material-ui/icons/ShowChart"

import createOutput from "../createOutput.js"
import Strings from "src/config/strings.js"
import fix from "src/utils/fix.js"
import outputs from "src/Model/Outputs/Outputs.js"
import "./TimingDiagramm.scss"

class TimingDiagramm extends Component {
    render() {
        const object = new outputs["TimeTable"]({ objects: this.props.selectedObjects, model: this.props.model })

        const data = object.generateData()

        const datasets = Object.entries(data).map(([id, values], index) => {
            const object = this.props.model.getObjectById(id)

            return {
                label: object.name,
                data: values,
                borderColor: object.color,
                fill: false
            }
        })

        const labels = []
        for(let i = 0; i < object.timesteps / object.dt; i++) {
            labels[i] = fix(i * object.dt)
        }
        
        return(
            <Line
                width={window.innerWidth * .9}
                height={window.innerHeight * .8}

                data={{
                    labels,
                    datasets
                }}

                options={{
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: Strings["Outputs.TimingDiagram.XAxesLabel"]
                            }
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }}
            />
        )
    }
}

export default createOutput(TimingDiagramm, {
    type: "TimingDiagramm",
    label: Strings["Outputs.TimingDiagram.Label"],
    icon: ShowChartIcon
})