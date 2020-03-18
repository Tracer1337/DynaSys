import React, { Component } from "react"

import createOutput from "../createOutput.js"
import Strings from "config/strings.json"
import outputs from "src/Model/Outputs/Outputs.js"
import "./TimeTable.scss"

class TimeTable extends Component {
    render() {
        const object = new outputs["TimeTable"]({ objects: this.props.selectedObjects, model: this.props.model })

        const data = object.generateData()

        // Change data = {id: [values, ...], ...} to formatted = [{id: value, ...}, ...]
        const formatted = []
        for(let i = 0; i < object.getTimeSteps(); i++) {
            formatted[i] = {}
            for(let id in data) {
                formatted[i][id] = data[id][i]
            }
        }

        console.log(formatted)

        return (
            <div className="time-table">
                <table border="1" style={{borderCollapse: "collapse"}}>

                    <thead>
                        <tr>
                            <th>{Strings.Outputs.TimeTable.Time}</th>
                            {
                                Object.keys(data).map(id => 
                                    <th key={id}>{this.props.getObjectById(id).name}</th>
                                )
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            formatted.map((row, t) => 
                                <tr>
                                    <td>{t}</td>
                                    {
                                        Object.values(row).map(value => 
                                            <td>{value}</td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default createOutput(TimeTable, {
    type: "TimeTable",
    label: Strings.Outputs.TimeTable.Label
})