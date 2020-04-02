import React, { Component } from "react"
import FilterDramaIcon from "@material-ui/icons/FilterDrama"

import createTool from "../createTool.js"
import Strings from "src/config/strings.js"

class Source extends Component {
    render() {
        return (
            <div className="object source" data-id={this.props.object.id}>
                <FilterDramaIcon className="icon"/>
            </div>
        )
    }
}
export default createTool(Source, {
    type: "Source",
    label: Strings["Tools.RateOfChange.Source.Label"],
    hideInToolbar: true,
    dialogAvailable: false,
    isMovable: true
})