import React, { Component } from "react"

import tools from "../Tools/Tools.js"
import "./Toolbar.scss"

class Toolbar extends Component {
    state = {
        selected: null
    }

    clearSelection = () => {
        this.setState({selected: null})
    }

    handleClick(type) {
        const newState = this.state.selected === type ? null : type
        this.setState({selected: newState})

        if(this.props.onActiveToolChange) {
            this.props.onActiveToolChange(newState)
        }
    }

    render() {
        return (
            <div className="toolbar">
                {Object.entries(tools).map(([type, tool]) => !tool.config.hideInToolbar && (
                    <button 
                        className={`item ${this.state.selected === type ? "selected" : ""}`}
                        key={type}
                        onClick={() => this.handleClick(type)}
                    >
                        {tool.config.label}
                    </button>
                ))}
            </div>
        )
    }
}

export default Toolbar