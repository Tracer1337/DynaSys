import React, { Component } from "react"
import ReactDOM from "react-dom"

import SVGArrow from "../../Utils/SVG/Arrow.js"

import createTool from "../createTool.js"
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

    componentDidMount() {
        if(!this.props.unSettled) {
            this.props.onExpand()
        }
    }

    render() {
        if (this.props.unSettled) {
            return <></>
        }

        const input = this.props.object.inputs[0]
        const output = this.props.object.outputs[0]

        const inputDomElement = this.props.getDomObjectById(input.id)
        const outputDomElement = this.props.getDomObjectById(output.id)

        this.props.onChange({id: this.props.object.id, newValues: {x: 0, y: 0}})

        return (
            <div 
                className="object rate-of-change" 
                data-id={this.props.object.id} 
                ref={ref => this.container = ref}
            >
                <svg width="100%" height="100%">
                    {this.container && inputDomElement && outputDomElement &&
                        <SVGArrow 
                            from={{ x: input.x + inputDomElement.offsetWidth / 2, y: input.y + inputDomElement.offsetHeight / 2 }} 
                            to={{ x: output.x + outputDomElement.offsetWidth / 2, y: output.y + outputDomElement.offsetHeight / 2 }}
                            Label={({x, y}) => ReactDOM.createPortal(
                                <div 
                                    className="action" 
                                    onClick={this.props.onClick}
                                    style={{left: x+"px", top: y+"px"}}
                                    data-id={this.props.object.id}
                                >
                                    {this.props.label}
                                </div>
                            , this.container)}
                        />
                    }
                </svg>
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