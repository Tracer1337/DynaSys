import React, { Component } from "react"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"

import createTool from "../createTool.js"
import Strings from "src/config/strings.js"
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
    label: Strings["Tools.State.Label"],
    icon: CheckBoxOutlineBlankIcon,
    dialogAvailable: true,
    isMovable: true
})