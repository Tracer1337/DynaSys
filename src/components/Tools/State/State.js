import React, { Component } from "react"

import createTool from "../createTool.js"
import Strings from "src/config/strings.json"
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
            <div className="object state" data-id={this.props.object.id} onClick={this.props.onClick}>
                {this.props.label}
            </div>
        )
    }
}

export default createTool(State, {
    type: "State",
    label: Strings.Tools.State.Label,
    dialogAvailable: true,
    isMovable: true
})