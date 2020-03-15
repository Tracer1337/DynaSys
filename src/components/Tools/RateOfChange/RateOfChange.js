import React, { Component } from "react"
import ReactDOM from "react-dom"

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
                    inputs: [this.input],
                    outputs: [this.output]
                }
            })
        }
    }

    render() {
        if (this.props.unSettled) {
            return <></>
        }

        const input = this.props.getObjectById(this.props.object.inputs[0])
        const output = this.props.getObjectById(this.props.object.outputs[0])

        const width = Math.abs(output.x - input.x)
        const height = Math.abs(output.y - input.y)

        const x = Math.min(input.x, output.x) + 10
        const y = Math.min(input.y, output.y) + 10

        this.props.onChange({id: this.props.object.id, newValues: {x, y}})

        return (
            <div 
                className="rate-of-change" 
                id={this.props.object.id} 
                style={{width: width+"px", height: height+"px"}}
            >
                <svg className="arrow" width={width} height={height}>
                    <path 
                        d={`M0 -5 L${width} ${height-5} M0 5 L${width} ${height+5}`}
                        stroke="black"
                        fill="none"
                    />
                </svg>

                <div className="action" onClick={this.props.onClick}>
                    {this.props.label}
                </div>
            </div>
        )
    }
}

export default createTool(RateOfChange, {
    type: "RateOfChange",
    label: Strings.Tools.RateOfChange.Label,
    dialogAvailable: true,
    className: "click-through"
})