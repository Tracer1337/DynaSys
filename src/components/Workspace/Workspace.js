import React, { Component } from "react"

import ToolSpace from "./ToolSpace/ToolSpace.js"
import ConnectorSpace from "./ConnectorSpace/ConnectorSpace.js"
import "./Workspace.scss"

class Workspace extends Component {
    AcrossSpaceCommunication = {
        set: (key, newValues) => {
            this.AcrossSpaceCommunication = {
                ...this.AcrossSpaceCommunication,
                [key]: {
                    ...this.AcrossSpaceCommunication[key],
                    ...newValues
                }
            }

            this.forceUpdate()
        }
    }

    render() {
        return (
            <div 
                className="workspace" 
                ref={ref => this.container = ref}
            >
                <ToolSpace acrossSpaceCommunication={this.AcrossSpaceCommunication}/>
                
                <ConnectorSpace acrossSpaceCommunication={this.AcrossSpaceCommunication} container={this.container}/>
            </div>
        )
    }
}

export default Workspace