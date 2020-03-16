import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"
import Dialog from "./components/Dialog/Dialog.js"

import objects from "./Model/Objects/Objects.js"
import outputs from "./Model/Outputs/Outputs.js"
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

    handleOutputClicked(event) {
        if(!this.model.getObjects().length) {
            this.setState({renderOutputWaring: true})
        } else {
            this.setState({renderOutput: event.type})
        }
    }

    handleOutputClose() {
        this.setState({renderOutput: null})
    }

    componentDidMount() {
        window.model = this.model

        const state = new objects["State"]({
            name: "Zustand 1",
            value: 10,
            id: -1,
            x: 100,
            y: 200
        })

        const sink = new objects["Sink"]({
            x: 300,
            y: 500,
            id: -2
        })

        const roc1 = new objects["RateOfChange"]({
            name: "Änderung 1",
            id: -3,
            value: 1,
            inputs: [state],
            outputs: [sink]
        })

        const source = new objects["Source"]({
            x: 50,
            y: 50,
            id: -4
        })

        const roc2 = new objects["RateOfChange"]({
            name: "Änderung 2",
            id: -5,
            value: 1.5,
            inputs: [source],
            outputs: [state]
        })

        // this.model.add([state, sink, source, roc1, roc2])

        this.forceUpdate()
    }

    render() {
        return (
            <div className="app">
                <Toolbar 
                    onActiveToolChange={this.handleActiveToolChange.bind(this)}
                    onOutputClicked={this.handleOutputClicked.bind(this)}
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
                        outputClass: outputs[this.state.renderOutput],
                        getObjectById: this.model.getObjectById,
                        onClose: this.handleOutputClose.bind(this)
                    })
                )}
            </div>
        )
    }
}

export default App
