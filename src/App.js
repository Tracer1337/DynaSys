import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"
import Dialog from "./components/Dialog/Dialog.js"

import objects from "./Model/Objects/Objects.js"
import presets from "./Model/Presets/Presets.js"
import outputRenderers from "./components/Outputs/Outputs.js"
import Model from "./Model/Model.js"

import Strings from "config/strings.json"

import "./App.scss"

class App extends Component {
    state = {
        activeTool: null,
        renderOutput: null
    }

    model = new Model()

    handleActiveToolChange(type) {
        this.setState({activeTool: type})
    }

    handleSettle() {
        this.toolbar.clearSelection()
        this.setState({activeTool: null})
    }

    handleObjectCreate(event) {
        const newObject = new objects[event.type](event.props)
        this.model.add(newObject)
        this.forceUpdate()
        return newObject
    }

    handleObjectChange(event) {
        this.model.update(event.id, event.newValues)
        this.forceUpdate()
    }

    handleOutputClick(event) {
        if(!this.model.getObjects().length) {
            this.setState({renderOutputWaring: true})
        } else {
            this.setState({renderOutput: event.type})
        }
    }

    handleOutputClose() {
        this.setState({renderOutput: null})
    }

    handlePresetClick(name) {
        presets[name](this.model)
        this.forceUpdate()
    }

    componentDidMount() {
        window.model = this.model
    }

    render() {
        return (
            <div className="app">
                <Toolbar 
                    onActiveToolChange={this.handleActiveToolChange.bind(this)}
                    onOutputClick={this.handleOutputClick.bind(this)}
                    onPresetClick={this.handlePresetClick.bind(this)}
                    presets={presets}
                    ref={ref => this.toolbar = ref}
                />

                <Workspace 
                    activeTool={this.state.activeTool} 
                    onSettle={this.handleSettle.bind(this)}
                    onObjectCreate={this.handleObjectCreate.bind(this)}
                    onObjectChange={this.handleObjectChange.bind(this)}
                    objects={this.model.getObjects()}
                    getObjectById={this.model.getObjectById}
                />

                {this.state.renderOutputWaring && (
                    <Dialog
                        fields={[{
                            type: "textbox",
                            value: Strings.Dialogs.OutputWarning.Text
                        }, {
                            type: "submit",
                            value: Strings.Dialogs.OutputWarning.Accept
                        }]}
                        onSubmit={() => this.setState({renderOutputWaring: false})}
                    />
                )}

                {this.state.renderOutput && (
                    React.createElement(outputRenderers[this.state.renderOutput], {
                        model: this.model,
                        getObjectById: this.model.getObjectById,
                        onClose: this.handleOutputClose.bind(this)
                    })
                )}
            </div>
        )
    }
}

export default App
