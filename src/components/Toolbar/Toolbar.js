import React, { Component } from "react"

import tools from "../Tools/Tools.js"
import "./Toolbar.scss"

class Toolbar extends Component {
    state = {
        selected: -1
    }

    clearSelection = () => {
        this.setState({selected: -1})
    }

    handleClick(i) {
        const newState = this.state.selected === i ? -1 : i
        this.setState({selected: newState})

        if(this.props.onActiveToolChange) {
            this.props.onActiveToolChange(newState)
        }
    }

    render() {
        return (
            <div className="toolbar">
                {tools.map((t, i) => (
                    <button 
                        className={`item ${this.state.selected === i ? "selected" : ""}`}
                        key={i}
                        onClick={() => this.handleClick(i)}
                    >
                        {t.config.label}
                    </button>
                ))}
            </div>
        )
    }
}

export default Toolbar