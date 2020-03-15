import React, { Component } from "react"

import createTool from "../createTool.js"
import Strings from "config/strings.json"
import "./State.scss"

class State extends Component {
    userSettled = () => {
        this.props.onObjectCreate({
            type: "State", 
            settled: true
        })
    }

    render() {
        return (
            <div className="state" id={this.props.object.id}>
                {this.props.label}
            </div>
        )
    }
}

export default createTool(State, {
    type: "State",
    label: Strings.Tools.State.Label,
    dialogAvailable: true
})