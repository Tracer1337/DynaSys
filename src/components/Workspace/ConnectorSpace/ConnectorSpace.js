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

    establishConnection(input, output, label) {
        const Element = (
            <Connector
                key={this.idCounter++}
                input={input}
                output={output}
                label={label}
                getObjectPositionById={this.props.acrossSpaceCommunication.ToolSpace.getObjectPositionById}
                onObjectChange={this.context.onObjectChange}
                onShallowObjectChange={this.context.onShallowObjectChange}
            />
        )

        const newConnection = {
            input: input,
            output: output,
            Connector: Element
        }

        this.setState({
            connections: [...this.state.connections, newConnection],
            renderPreview: false
        })
    }

    componentDidUpdate() {
        // Remove unneccessary connections
        const filteredConnections = this.state.connections.filter(connection => {
            const inputExists = this.context.model.getObjectById(connection.input.id)
            const outputExists = this.context.model.getObjectById(connection.output.id)
            return inputExists && outputExists
        })

        if(filteredConnections.length !== this.state.connections.length) {
            this.setState({connections: filteredConnections})
        }
    }

    componentDidMount() {
        this.props.acrossSpaceCommunication.set("ConnectorSpace", {
            establishConnection: this.establishConnection.bind(this),
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