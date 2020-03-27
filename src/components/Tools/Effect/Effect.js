import { Component } from "react"

import createConnector from "../Connector/createConnector.js"
import Strings from "src/config/strings.js"
import "./Effect.scss"

class Effect extends Component {
    userSettled = ({ object }) => {
        if (object) {
            // Prevent user from setting the input to an object without output e.g. Sink
            if (!this.props.input && object.hasOutput === false) {
                return
            }

            // Prevent user from setting the output to an object without input e.g. Effect
            if (this.props.input && object.hasInput === false) {
                return
            }

            if (object.type === "Sink" || object.type === "Source" || this.props.input === object || this.props.output === object) {
                return
            }

            if (!this.props.input) {
                this.props.setInput(object)

            } else if (!this.props.output) {
                this.props.setOutput(object)
            }
        }
    }

    render() {
        return null
    }
}

export default createConnector(Effect, {
    type: "Effect",
    label: Strings.Tools.Effect.Label,
    dialogAvailable: false,
    isMovable: false
})