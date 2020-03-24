import React, { Component } from "react"

import MaskConverter from "../../Utils/MaskConverter/MaskConverter.js"
import createOutput from "../createOutput.js"
import Strings from "src/config/strings.json"
import "./Summary.scss"

class Summary extends Component {
    render() {
        const objects = this.props.model.getObjects().filter(object => this.props.selectedObjects.includes(object))

        return (
            <div className="summary">
                {
                    objects.map(object => (
                        <div className="equation" key={object.id}>
                            <MaskConverter maskedString={object.getEquation()}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default createOutput(Summary, {
    type: "Summary",
    label: Strings.Outputs.Summary.Label
})