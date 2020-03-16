import React, { Component } from "react"

import createOutput from "../createOutput.js"
import Strings from "config/strings.json"
import "./TimingDiagramm.scss"

class TimingDiagramm extends Component {
    render() {
        const Diagramm = new this.props.outputClass({objects: this.props.selectedObjects, model: this.props.model})

        console.log(Diagramm)

        console.log(Diagramm.generateData())

        return(
            <div className="timing-diagramm">

            </div>
        )
    }
}

export default createOutput(TimingDiagramm, {
    type: "TimingDiagramm",
    label: Strings.Outputs.TimingDiagramm.Label
})