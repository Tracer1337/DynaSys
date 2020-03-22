import React, { Component } from "react"

import ToolSpace from "./ToolSpace/ToolSpace.js"
import ConnectorSpace from "./ConnectorSpace/ConnectorSpace.js"
import "./Workspace.scss"

class Workspace extends Component {
    ASCValue = {
        set: (key, newValues) => {
            this.ASCValue = {
                ...this.ASCValue,
                [key]: {
                    ...this.ASCValue[key],
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
                <ToolSpace acrossSpaceCommunication={this.ASCValue}/>
                
                <ConnectorSpace acrossSpaceCommunication={this.ASCValue} container={this.container}/>
            </div>
        )
    }
}

export default Workspace