import React, { Component } from "react"

import { AppContext } from "src/App.js"
import SVGArrow from "src/components/Utils/SVG/Arrow.js"
import "./ConnectorSpace.scss"

class ConnectorSpace extends Component {
    state = {
        connections: [],
        renderPreview: false,
        previewFrom: null
    }

    connectorRefs = []

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

    establishConnection(input, output) {
        const from = this.props.acrossSpaceCommunication.ToolSpace.getObjectPositionById(input.id)
        const to = this.props.acrossSpaceCommunication.ToolSpace.getObjectPositionById(output.id)

        const fromTo = { x: to.x - from.x, y: to.y - from.y }
        const labelPosition = { x: from.x + fromTo.x / 2, y: from.y + fromTo.y / 2 }

        const Connector = (
            <SVGArrow
                key={this.idCounter++}
                from={from}
                to={to}
                ref={ref => this.connectorRefs.push(ref)}
            />
        )

        const newConnection = {
            input: input,
            output: output,
            Connector
        }

        this.setState({
            connections: [...this.state.connections, newConnection],
            renderPreview: false
        })

        return labelPosition
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
                                {this.state.connections.map((object, i) => object.Connector)}
                            </svg>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default ConnectorSpace