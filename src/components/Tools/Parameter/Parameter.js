import React, { Component } from "react"

import createTool from "../createTool.js"
import Strings from "src/config/strings.json"
import "./Parameter.scss"

class Parameter extends Component {
    userSettled = () => {
        this.props.onObjectCreate({
            type: "Parameter",
            settled: true
        })
    }

    render() {
        return (
            <div className="object action parameter" data-id={this.props.object.id} onClick={this.props.onClick}>
                {this.props.label}
            </div>
        )
    }
}

export default createTool(Parameter, {
    type: "Parameter",
    label: Strings.Tools.Parameter.Label,
    dialogAvailable: true
})