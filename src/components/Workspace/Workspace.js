import React, { Component } from "react"

import ToolSpace from "./ToolSpace/ToolSpace.js"
import ConnectorSpace from "./ConnectorSpace/ConnectorSpace.js"
import "./Workspace.scss"

class Workspace extends Component {
    render() {
        return (
            <div 
                className="workspace" 
                ref={ref => this.container = ref}
            >
                <ToolSpace
                    ref={ref => this.toolSpace = ref}
                    establishConnection={(...args) => this.connectorSpace.establishConnection(...args)}
                />
                
                <ConnectorSpace 
                    ref={ref => this.connectorSpace = ref}
                    getObjectPositionById={(...args) => this.toolSpace.getObjectPositionById(...args)}
                />
            </div>
        )
    }
}

export default Workspace