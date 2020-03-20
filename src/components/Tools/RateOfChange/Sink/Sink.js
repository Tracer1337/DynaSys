import React, { Component } from "react"

import createTool from "../../createTool.js"
import Strings from "src/config/strings.json"
import "./Sink.scss"

class Sink extends Component {
    render() {
        return (
            <div className="object action sink" data-id={this.props.object.id}>
                Sink
            </div>
        )
    }
}

export default createTool(Sink, {
    type: "Sink",
    label: Strings.Tools.RateOfChange.Sink.Label,
    hideInToolbar: true,
    dialogAvailable: false
})