import React, { Component } from "react"

import createTool from "../createTool.js"
import Strings from "config/strings.json"
import "./RateOfChange.scss"

class RateOfChange extends Component {
    input = null
    output = null
    
    userSettled = ({id}) => {
        if (isNaN(id)) {

            if (this.input === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Source"
                })
                this.input = newObject.id

            } else if (this.output === null) {
                const newObject = this.props.onObjectCreate({
                    type: "Sink"
                })
                this.output = newObject.id

            }
        } else {
            if (this.input === null) {
                this.input = id
            } else if (this.output === null) {
                this.output = id
            }
        }

        if (this.input !== null && this.output !== null) {
            this.props.onObjectCreate({
                type: "RateOfChange",
                settled: true,
                props: {
                    input: this.input,
                    output: this.output
                }
            })
        }
    }

    render() {
        if (this.props.unSettled) {
            return <></>
        }

        return (
            <div className="rate-of-change" id={this.props.object.id}>
                {this.props.label}
            </div>
        )
    }
}

export default createTool(RateOfChange, {
    type: "RateOfChange",
    label: Strings.Tools.RateOfChange.Label,
    dialogAvailable: true
})