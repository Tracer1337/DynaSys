import React, { Component } from "react"
import { Line } from "react-chartjs-2"

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
            <div className="timing-diagramm">
                <Line
                    width={window.innerWidth * .9}
                    height={window.innerHeight * .8}

                    data={{
                        labels,
                        datasets
                    }}

                    options={{
                        title: {
                            display: true,
                            text: Strings["Outputs.TimingDiagramm.Label"]
                        },
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: Strings["Outputs.TimingDiagramm.XAxesLabel"]
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
            </div>
        )
    }
}

export default createOutput(TimingDiagramm, {
    type: "TimingDiagramm",
    label: Strings["Outputs.TimingDiagram.Label"]
})