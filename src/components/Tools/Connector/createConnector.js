import React, { Component } from "react"

import createTool from "../createTool.js"
import "./Connector.scss"

const createConnector = (Child, toolProps) => {
    class Connector extends Component {
        state = {input: null, output: null}

        setInput(object) {
            this.setState({input: object})
        }

        setOutput(object) {
            this.setState({output: object})
        }

        userSettled = (object) => {
            this.child.userSettled(object)
        }

        componentDidUpdate() {
            if(this.state.input && this.state.output) {
                const object = this.props.onObjectCreate({
                    type: toolProps.type,
                    settled: true,
                    props: {
                        inputs: [this.state.input],
                        outputs: [this.state.output]
                    }
                })

                requestAnimationFrame(() => {
                    const labelPosition = this.props.establishConnection(this.state.input, this.state.output)
                    this.props.onObjectChange({id: object.id, newValues: labelPosition})
                })
            }
        }

        render() {
            return (
                <Child 
                    ref={ref => this.child = ref} 
                    setInput={this.setInput.bind(this)}
                    setOutput={this.setOutput.bind(this)}
                    input={this.state.input}
                    output={this.state.output}
                    {...this.props}
                />
            )
        }
    }

    return createTool(
        Connector,
        toolProps
    )
}

export default createConnector