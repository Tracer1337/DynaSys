import React, { Component } from "react"

import createConnector from "../Connector/createConnector.js"
import Strings from "src/config/strings.json"
import "./RateOfChange.scss"

class RateOfChange extends Component {
    userSettled = ({object}) => {
        if(object && object.hasInput === false) {
            return
        }

        if (!object) {

            if (this.props.input === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Source"
                })
                this.props.setInput(newObject)

            } else if (this.props.output === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Sink"
                })
                this.props.setOutput(newObject)
            }

        } else {

            if (this.props.input === null) {
                this.props.setInput(object)

            } else if (this.props.output === null) {
                this.props.setOutput(object)
            }

        }
    }

    render() {
        if(this.props.unSettled) {
            return <></>
        }
        
        return (
            <div
                className="object rate-of-change"
                onClick={this.props.onClick}
                style={{left: this.props.x + "px", top: this.props.y + "px"}}
                data-id={this.props.object.id}
            >
                {this.props.label}
            </div>
        )
    }
}

export default createConnector(RateOfChange, {
    type: "RateOfChange",
    label: Strings.Tools.RateOfChange.Label,
    dialogAvailable: true,
    isMovable: false
})