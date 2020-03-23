import React, { Component } from "react"

import { AppContext } from "src/App.js"
import SVGArrow from "src/components/Utils/SVG/Arrow.js"

class Connector extends Component {
    constructor(props) {
        super(props)

        this.handleObjectChange = this.handleObjectChange.bind(this)
    }

    handleObjectChange() {
        if(
            this.lastInput.x !== this.props.input.x ||
            this.lastInput.y !== this.props.input.y ||
            this.lastOutput.x !== this.props.output.x ||
            this.lastOutput.y !== this.props.output.y
        ) {
            this.forceUpdate()
        }
    }

    componentDidMount() {
        this.context.addEventListener("objectchange", this.handleObjectChange)
    }

    componentWillUnmount() {
        this.context.removeEventListener("objectchange", this.handleObjectChange)
    }

    render() {
        this.lastInput = this.props.input.clone()
        this.lastOutput = this.props.output.clone()

        const from = this.props.getObjectPositionById(this.props.input.id)
        const to = this.props.getObjectPositionById(this.props.output.id)

        const fromTo = { x: to.x - from.x, y: to.y - from.y }
        const labelPosition = { x: from.x + fromTo.x / 2, y: from.y + fromTo.y / 2 }

        if(labelPosition.x !== this.props.label.x || labelPosition.y !== this.props.label.y) {
            this.props.onShallowObjectChange({id: this.props.label.id, newValues: labelPosition})
        }

        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    return (
                        <SVGArrow
                            from={from}
                            to={to}
                        />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Connector