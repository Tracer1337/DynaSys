import React, { Component } from "react"

import createOutput from "../createOutput.js"
import Strings from "config/strings.json"
import "./Summary.scss"

class Summary extends Component {
    render() {
        const objects = this.props.model.getObjects().filter(object => this.props.selectedObjects.includes(object))

        return (
            <div className="summary">
                <table>
                    {
                        objects.map(object => (
                            <tbody key={object.id}>
                                <tr>
                                    <td>{Strings.Outputs.Summary.Name}</td>
                                    <td>{object.name}</td>
                                </tr>

                                <tr>
                                    <td>{Strings.Outputs.Summary.Value}</td>
                                    <td>{object.value}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        )
    }
}

export default createOutput(Summary, {
    type: "Summary",
    label: Strings.Outputs.Summary.Label
})