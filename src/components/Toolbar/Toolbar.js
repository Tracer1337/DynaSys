import React, { Component } from "react"

import tools from "../Tools/Tools.js"
import outputs from "../Outputs/Outputs.js"
import Strings from "config/strings.json"
import "./Toolbar.scss"

class Toolbar extends Component {
    state = {
        selected: null
    }

    clearSelection = () => {
        this.setState({selected: null})
    }

    handleToolClick(type) {
        const newState = this.state.selected === type ? null : type
        this.setState({selected: newState})

        this.props.onActiveToolChange(newState)
    }

    handleOutputClick(type) {
        this.props.onOutputClick({type})
    }
    
    handlePresetClick(name) {
        this.props.onPresetClick(name)
    }

    render() {
        return (
            <div className="toolbar">

                <p>{Strings.Toolbar.Tools}</p>

                <div className="section tools">
                    {Object.entries(tools).map(([type, tool]) => !tool.config.hideInToolbar && (
                        <button 
                            className={`item ${this.state.selected === type ? "selected" : ""}`}
                            key={type}
                            onClick={() => this.handleToolClick(type)}
                        >
                            {tool.config.label}
                        </button>
                    ))}
                </div>

                <p>{Strings.Toolbar.Outputs}</p>

                <div className="section outputs">
                    {Object.entries(outputs).map(([type, output]) => (
                        <button
                            className={`item`}
                            key={type}
                            onClick={() => this.handleOutputClick(type)}
                        >
                            {output.config.label}
                        </button>
                    ))}
                </div>

                <p>{Strings.Toolbar.Presets}</p>

                <div className="section presets">
                    {Object.entries(this.props.presets).map(([name]) => (
                        <button
                            className={`item`}
                            key={name}
                            onClick={() => this.handlePresetClick(name)}
                        >
                            {name}
                        </button>
                    ))}
                </div>

            </div>
        )
    }
}

export default Toolbar