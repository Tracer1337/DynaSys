import React, { Component } from "react"

import createConnector from "../Connector/createConnector.js"
import Strings from "src/config/strings.json"
import "./Effect.scss"

class Effect extends Component {
    userSettled = ({ object }) => {
        if (object) {
            // Prevent user from setting the input to an object without output e.g. Sink
            if (!this.input && object.hasOutput === false) {
                return
            }

            // Prevent user from setting the output to an object without input e.g. Effect
            if (this.input && object.hasInput === false) {
                return
            }
        }

        if (object) {

            if (object.type === "Sink" || object.typee === "Source" || this.input === object || this.output === object) {
                return
            }

            if (!this.input) {
                this.input = object

            } else if (!this.output) {
                this.output = object
                this.props.onObjectCreate({
                    type: "Effect",
                    settled: true,
                    props: {
                        inputs: [this.input],
                        outputs: [this.output]
                    }
                })
            }

        }
    }

    render() {
        return <></>
    }
}

export default createConnector(Effect, {
    type: "Effect",
    label: Strings.Tools.Effect.Label,
    dialogAvailable: false
})