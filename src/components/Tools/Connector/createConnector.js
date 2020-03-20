import React, { Component } from "react"
import ReactDOM from "react-dom"

import createTool from "../createTool.js"
import SVGArrow from "../../Utils/SVG/Arrow.js"
import "./Connector.scss"

const createConnector = (Child, toolProps) => {
    class Connector extends Component {
        input = null
        output = null

        userSettled = (object) => {
            this.child.userSettled(object)
        }

        componentDidMount() {
            if (!this.props.unSettled) {
                this.props.onExpand()
            }
        }

        render() {
            if (this.props.unSettled) {
                return (
                    <Child 
                        ref={ref => this.child = ref} 
                        unSettled
                        {...this.props}
                    />
                )
            }

            const input = this.props.object.inputs[0]
            const output = this.props.object.outputs[0]

            const inputPosition = this.props.getActionPositionById(input.id)
            const outputPosition = this.props.getActionPositionById(output.id)

            if (!inputPosition || !outputPosition) {
                return <></>
            }

            this.props.onChange({ id: this.props.object.id, newValues: { x: 0, y: 0 } })

            return (
                <div
                    className="object connector"
                    data-id={this.props.object.id}
                    ref={ref => this.container = ref}
                >
                    <svg width="100%" height="100%">
                        {this.container && inputPosition && outputPosition && <SVGArrow
                            from={inputPosition}
                            to={outputPosition}
                            Label={props => 
                                ReactDOM.createPortal(
                                    <Child
                                        {...this.props}
                                        {...props}
                                    />
                                , this.container)
                            }
                        />}
                    </svg>
                </div>
            )
        }
    }

    return createTool(
        Connector,
        {
            className: "click-through",
            ...toolProps
        }
    )
}

export default createConnector