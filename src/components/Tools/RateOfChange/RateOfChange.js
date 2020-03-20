import React, { Component } from "react"

import createConnector from "../Connector/createConnector.js"
import Strings from "src/config/strings.json"
import "./RateOfChange.scss"

class RateOfChange extends Component {
    input = null
    output = null
    
    userSettled = ({object}) => {
        if(object && object.hasInput === false) {
            return
        }

        if (!object) {

            if (this.input === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Source"
                })
                this.input = newObject

            } else if (this.output === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Sink"
                })
                this.output = newObject
            }
            
        } else {
            if (this.input === null) {
                this.input = object
            } else if (this.output === null) {
                this.output = object
            }
        }

        if (this.input !== null && this.output !== null) {
            this.props.onObjectCreate({
                type: "RateOfChange",
                settled: true,
                props: {
                    inputs: [this.input],
                    outputs: [this.output]
                }
            })
        }
    }

    render() {
        return (
            <div
                className="action"
                onClick={this.props.onClick}
                style={{ left: this.props.x + "px", top: this.props.y + "px" }}
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
    className: "click-through"
})