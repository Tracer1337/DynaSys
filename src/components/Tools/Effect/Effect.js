import React, { Component } from "react"

import createTool from "../createTool.js"
import SVGArrow from "../../Utils/SVG/Arrow.js"
import Strings from "config/strings.json"
import "./Effect.scss"

class Effect extends Component {
    input = null
    output = null

    userSettled = ({object}) => {
        if(object) {

            if(object.constructor.name === "Sink" || object.constructor.name === "Source" || this.input === object || this.output === object) {
                return
            }

            if(!this.input) {
                this.input = object

            } else if(!this.output) {
                this.output = object
                this.props.onObjectCreate({
                    type: "Effect",
                    settled: true,
                    props: {
                        inputs: [this.input], 
                        outputs: [this.output]
                    }
                })
            }

        }
    }

    componentDidMount() {
        if(!this.props.unSettled) {
            this.props.onExpand()
        }
    }

    render() {
        if(this.props.unSettled) {
            return <></>
        }

        const input = this.props.object.inputs[0]
        const output = this.props.object.outputs[0]

        const inputDomElement = this.props.getDomObjectById(input.id)
        const outputDomElement = this.props.getDomObjectById(output.id)

        this.props.onChange({id: this.props.object.id, newValues: { x: 0, y: 0 }})

        return (
            <div 
                className="object effect"
                data-id={this.props.id}
            >
                <svg width="100%" height="100%">
                    <SVGArrow
                        from={{ x: input.x + inputDomElement.offsetWidth / 2, y: input.y + inputDomElement.offsetHeight / 2}}
                        to={{ x: output.x + outputDomElement.offsetWidth / 2, y: output.y + outputDomElement.offsetHeight / 2}}
                    />
                </svg>
            </div>
        )
    }
}

export default createTool(Effect, {
    type: "Effect",
    label: Strings.Tools.Effect.Label,
    dialogAvailable: false,
    className: "click-through"
})