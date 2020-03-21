import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"
import Dialog from "./components/Dialog/Dialog.js"

import objects from "./Model/Objects/Objects.js"
import presets from "./Model/Presets/Presets.js"
import outputRenderers from "./components/Outputs/Outputs.js"
import Model from "./Model/Model.js"

import Strings from "src/config/strings.json"

import "./App.scss"

const AppContext = React.createContext({})

class App extends Component {
    model = new Model()

    state = {
        renderOutput: null,
        contextValue: {
            model: this.model,
            activeTool: null,
            onObjectCreate: this.handleObjectCreate.bind(this),
            onObjectChange: this.handleObjectChange.bind(this),
            onSettle: this.handleSettle.bind(this)
        }
    }
    
    setContext(values) {
        this.setState({contextValue: {...this.state.contextValue, ...values}})
    }
    
    handleActiveToolChange(type) {
        this.setContext({activeTool: type})
    }

    handleSettle() {
        this.toolbar.clearSelection()
        this.setContext({activeTool: null})
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
        presets[name](objects => {
            this.model.add(objects)
            this.forceUpdate()
        })
        this.forceUpdate()
    }

    componentDidMount() {
        window.model = this.model
    }

    render() {
        return (
            <div className="app">
                <AppContext.Provider value={this.state.contextValue}>
                    <Toolbar
                        onActiveToolChange={this.handleActiveToolChange.bind(this)}
                        onOutputClick={this.handleOutputClick.bind(this)}
                        onPresetClick={this.handlePresetClick.bind(this)}
                        presets={presets}
                        ref={ref => this.toolbar = ref}
                    />

                    <Workspace/>

                    {this.state.renderOutputWaring && (
                        <Dialog
                            fields={[{
                                type: "textbox",
                                value: Strings.Dialogs.OutputWarning.Text
                            }, {
                                type: "submit",
                                value: Strings.Dialogs.OutputWarning.Accept
                            }]}
                            onSubmit={() => this.setState({ renderOutputWaring: false })}
                        />
                    )}

                    {this.state.renderOutput && (
                        React.createElement(outputRenderers[this.state.renderOutput], {
                            model: this.model,
                            getObjectById: this.model.getObjectById,
                            onClose: this.handleOutputClose.bind(this)
                        })
                    )}
                </AppContext.Provider>
            </div>
        )
    }
}

export default App
export {
    AppContext
}