import React, { Component } from "react"

import { AppContext } from "src/App.js"
import SVGArrow from "src/components/Utils/SVG/Arrow.js"
import Connector from "./Connector.js"
import "./ConnectorSpace.scss"

class ConnectorSpace extends Component {
    state = {
        connections: [],
        renderPreview: false,
        previewFrom: null
    }

    idCounter = 0

    enablePreview(input) {
        const from = this.props.acrossSpaceCommunication.ToolSpace.getObjectPositionById(input.id)
        this.setState({
            renderPreview: true, 
            previewFrom: from
        })
    }

    disablePreview() {
        this.setState({renderPreview: false})
    }

    createConnection(object) {
        const input = object.inputs[0]
        const output = object.outputs[0]

        const Element = (
            <Connector
                key={this.idCounter++}
                input={input}
                output={output}
                label={object}
                getObjectPositionById={this.props.acrossSpaceCommunication.ToolSpace.getObjectPositionById}
                onObjectChange={this.context.onObjectChange}
                onShallowObjectChange={this.context.onShallowObjectChange}
            />
        )
        
        return {
            object,
            input: input,
            output: output,
            Connector: Element
        }
    }

    componentDidUpdate() {
        // Add new connections        
        const newConnections = this.context.model.getObjects().map(object => {
            if(object.providesConnection) {
                if(!this.state.connections.some(connection => connection.object.id === object.id)) {
                    return this.createConnection(object)
                }
            }
            return false
        }).filter(e => e)

        // Remove unneccessary connections
        const filteredConnections = this.state.connections.filter(connection => {
            const inputExists = this.context.model.getObjectById(connection.input.id)
            const outputExists = this.context.model.getObjectById(connection.output.id)
            const objectExists = this.context.model.getObjectById(connection.object.id)
            return inputExists && outputExists && objectExists
        })

        if(filteredConnections.length !== this.state.connections.length || newConnections.length > 0) {
            // Render the new connections when the new objects are set into the DOM
            requestAnimationFrame(() => {
                this.setState({
                    connections: [
                        ...filteredConnections,
                        ...newConnections
                    ],
                    renderPreview: newConnections.length > 0 ? false : this.state.renderPreview
                })
            })
        }
    }

    componentDidMount() {
        this.props.acrossSpaceCommunication.set("ConnectorSpace", {
            enablePreview: this.enablePreview.bind(this),
            disablePreview: this.disablePreview.bind(this)
        })
    }

    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    return (
                        <div className="space connector-space">
                            <svg height="100%" width="100%">
                                {this.state.renderPreview && (
                                    <SVGArrow
                                        from={this.state.previewFrom}
                                        container={this.props.container}
                                    />
                                )}
                                {this.state.connections.map(object => object.Connector)}
                            </svg>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default ConnectorSpace