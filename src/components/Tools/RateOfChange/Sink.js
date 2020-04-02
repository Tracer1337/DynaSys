import React, { Component } from "react"
import FilterDramaIcon from "@material-ui/icons/FilterDrama"

import createTool from "../createTool.js"
import Strings from "src/config/strings.js"

class Sink extends Component {
    render() {
        return (
            <div className="object sink" data-id={this.props.object.id}>
                <FilterDramaIcon className="icon"/>
            </div>
        )
    }
}

export default createTool(Sink, {
    type: "Sink",
    label: Strings["Tools.RateOfChange.Sink.Label"],
    hideInToolbar: true,
    dialogAvailable: false,
    isMovable: true
})