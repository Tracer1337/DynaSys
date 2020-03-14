import React, { Component } from "react"

import Source from "./Source/Source.js"
import Sink from "./Sink/Sink.js"
import createTool from "../createTool.js"
import Strings from "config/strings.json"
import "./RateOfChange.scss"

class RateOfChange extends Component {
    state = {
        start: null,
        end: null
    }

    isSettled = false

    counter = 0

    userClicked = ({id}) => {
        // User has clicked an empty spot
        if(isNaN(id)) {
            this.setState({start: })
        } else {
            console.log("Clicked id", id)
        }

        if(this.counter++ === 1) {
            this.isSettled = true
        }
    }

    render() {
        return(
            <div className="rate-of-change" id={this.props.id}>
            </div>
        )
    }
}

export default createTool(RateOfChange, {
    type: "RateOfChange",
    label: Strings.Tools.RateOfChange.Label
})