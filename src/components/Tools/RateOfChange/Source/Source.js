import React, { Component } from "react"

import createTool from "../../createTool.js"
import Strings from "config/strings.json"
import "./Source.scss"

class Source extends Component {
    render() {
        return (
            <div className="object action source" data-id={this.props.object.id}>
                Source
            </div>
        )
    }
}
export default createTool(Source, {
    type: "Source",
    label: Strings.Tools.RateOfChange.Source.Label,
    hideInToolbar: true,
    dialogAvailable: false
})