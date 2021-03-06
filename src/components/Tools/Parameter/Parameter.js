import React, { Component } from "react"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"

import createTool from "../createTool.js"
import Strings from "src/config/strings.js"
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
            <div 
                className="object parameter" 
                data-id={this.props.object.id} 
                onClick={this.props.onClick}
            >
                {this.props.label}
            </div>
        )
    }
}

export default createTool(Parameter, {
    type: "Parameter",
    label: Strings["Tools.Parameter.Label"],
    icon: RadioButtonUncheckedIcon,
    dialogAvailable: true,
    isMovable: true
})