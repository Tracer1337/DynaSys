import React, { Component } from "react"

import Straight from "./Straight.js"
import Orthogonal from "./Orthogonal.js"

import SettingsProvider from "src/config/SettingsProvider.js"

const config = {
    tipLength: 7,
    color: "#607d8b",
    strokeWidth: 1.5
}

class Arrow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            connectionStyle: SettingsProvider.settings.connectionStyle.value
        }

        this.setPath = this.setPath.bind(this)
        this.handleSettingsChange = this.handleSettingsChange.bind(this)
    }

    setPath(...args) {
        this.component.setPath(...args)
    }

    handleMouseMove(event) {
        this.setPath(event)
    }

    handleSettingsChange({ detail: { key, value } }) {
        if (key === "connectionStyle" && value !== this.state.connectionStyle) {
            this.setState({ connectionStyle: value })
        }
    }

    componentDidUpdate() {
        this.setPath()
    }

    componentDidMount() {
        SettingsProvider.addEventListener("change", this.handleSettingsChange)

        if(!this.props.to) {
            window.addEventListener("mousemove", this.setPath)
        } else {
            this.setPath()
        }
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.setPath)
        SettingsProvider.removeEventListener("change", this.handleSettingsChange)
    }

    render() {
        if(this.state.connectionStyle === "orthogonal") {
            return (
                <Orthogonal
                    from={this.props.from}
                    to={this.props.to}
                    container={this.props.container}
                    ref={ref => this.component = ref}
                />
            )
        } else if (this.state.connectionStyle === "straight") {
            return (
                <Straight
                    from={this.props.from}
                    to={this.props.to}
                    container={this.props.container}
                    ref={ref => this.component = ref}
                />
            )
        }
    }
}

export default Arrow

export {
    config
}