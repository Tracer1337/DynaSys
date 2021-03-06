import React, { Component } from "react"

import createTool from "../createTool.js"
import "./Connector.scss"

const createConnector = (Child, toolProps) => {
    class Connector extends Component {
        state = {input: null, output: null}

        established = false

        setInput(object) {
            this.setState({input: object})
        }

        setOutput(object) {
            this.setState({output: object})
        }

        userSettled = (object) => {
            this.child.userSettled(object)
        }
        
        componentDidMount() {
            if(this.props?.object?.inputs?.[0] && this.props?.object?.outputs?.[0]) {
                this.established = true
            }
        }

        componentWillUnmount() {
            this.props.acrossSpaceCommunication.ConnectorSpace.disablePreview()
        }

        componentDidUpdate() {
            if(this.state.input && !this.state.output) {
                // Render arrow from input to cursor
                this.props.acrossSpaceCommunication.ConnectorSpace.enablePreview(this.state.input)

            } else if(this.state.input && this.state.output && !this.established) {
                // Create final connection
                this.props.onObjectCreate({
                    type: toolProps.type,
                    settled: true,
                    props: {
                        inputs: [this.state.input],
                        outputs: [this.state.output]
                    }
                })

                this.established = true
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