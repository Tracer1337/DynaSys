import React, { Component } from "react"
import { Line } from "react-chartjs-2"

import createOutput from "../createOutput.js"
import Strings from "config/strings.json"
import outputs from "src/Model/Outputs/Outputs.js"
import "./TimingDiagramm.scss"

const colors = ["#1abc9c", "#3498db", "#9b59b6", "#34495e", "#f1c40f", "#e74c3c", "#ecf0f1"]

class TimingDiagramm extends Component {
    render() {
        const Diagramm = new outputs["TimeTable"]({ objects: this.props.selectedObjects, model: this.props.model })

        const data = Diagramm.generateData()

        const datasets = Object.entries(data).map(([id, values], index) => {
            const object = this.props.getObjectById(id)

            return {
                label: object.name,
                data: values,
                borderColor: colors[index],
                fill: false
            }
        })

        const labels = []
        for(let i = 0; i < Diagramm.getTimeSteps(); i++) {
            labels[i] = i
        }

        return(
            <div className="timing-diagramm">
                <Line
                    width={600}
                    height={400}

                    data={{
                        labels,
                        datasets
                    }}

                    options={{
                        title: {
                            display: true,
                            text: Strings.Outputs.TimingDiagramm.Label
                        },
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: Strings.Outputs.TimingDiagramm.XAxesLabel
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default createOutput(TimingDiagramm, {
    type: "TimingDiagramm",
    label: Strings.Outputs.TimingDiagramm.Label
})