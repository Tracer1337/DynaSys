import React, { Component } from "react"

import {AppContext} from "src/App.js"
import SVGArrow from "src/components/Utils/SVG/Arrow.js"
import "./ConnectorSpace.scss"

class ConnectorSpace extends Component {
    state = {
        connections: []
    }

    connectorRefs = []

    idCounter = 0

    establishConnection = (input, output) => {
        const from = this.props.getObjectPositionById(input.id)
        const to = this.props.getObjectPositionById(output.id)

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

        this.setState({connections: [...this.state.connections, Connector]})

        return labelPosition
    }

    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    return (
                        <div className="space connector-space">
                            <svg height="100%" width="100%">
                                {this.state.connections}
                            </svg>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default ConnectorSpace