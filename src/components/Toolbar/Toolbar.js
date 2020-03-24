import React, { Component } from "react"

import Tools from "./sections/Tools.js"
import Outputs from "./sections/Outputs.js"
import Presets from "./sections/Presets.js"
import Model from "./sections/Model.js"
import ViewOnGithub from "./sections/ViewOnGithub.js"
import "./Toolbar.scss"

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <Tools {...this.props}/>

                <Outputs {...this.props}/>

                <Presets {...this.props}/>

                <Model {...this.props}/>
                
                <ViewOnGithub {...this.props}/>
            </div>
        )
    }
}

export default Toolbar