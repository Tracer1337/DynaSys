import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"
import Dialog from "./components/Dialog/Dialog.js"

import objects from "./Model/Objects/Objects.js"
import outputRenderers from "./components/Outputs/Outputs.js"
import Model from "./Model/Model.js"
import waitFrames from "./utils/waitFrames.js"
import Strings from "./config/strings.js"

import "./App.scss"

const AppContext = React.createContext({})

class App extends Component {
    model = new Model(Strings.Model.UnnamedModel)

    listeners = {}

    state = {
        renderOutput: null,

        contextValue: {
            model: this.model,
            activeTool: null,

            onObjectCreate: this.handleObjectCreate.bind(this),
            onObjectChange: this.handleObjectChange.bind(this),
            onObjectRemove: this.handleObjectRemove.bind(this),
            onShallowObjectChange: this.handleShallowObjectChange.bind(this),

            onSettle: this.handleSettle.bind(this),

            addEventListener: this.addEventListener.bind(this),
            removeEventListener: this.removeEventListener.bind(this),

            onActiveToolChange: this.handleActiveToolChange.bind(this),
            onOutputCreate: this.handleOutputCreate.bind(this),
            onOutputClose: this.handleOutputClose.bind(this),

            onModelLoad: this.handleModelLoad.bind(this),
            onModelReset: this.handleModelReset.bind(this)
        }
    }

    addEventListener(type, fn) {
        if(!this.listeners[type]) {
            this.listeners[type] = []
        }

        this.listeners[type].push(fn)
    }

    removeEventListener(type, fn) {
        if(!this.listeners[type]) {
            return
        }

        const index = this.listeners[type].findIndex(x => x === fn)
        this.listeners[type].splice(index, 1)
    }
    
    emit(event) {
        if(!this.listeners[event.type]) {
            return
        }

        this.listeners[event.type].forEach(fn => fn(event))
    }

    setContext(values) {
        this.setState({contextValue: {...this.state.contextValue, ...values}})
    }
    
    setModel(newModel) {
        this.model = newModel
        this.setState({
            contextValue: {
                ...this.state.contextValue,
                model: this.model
            }
        })
    }

    handleActiveToolChange(type) {
        this.setContext({activeTool: type})
    }

    handleSettle() {
        this.setContext({activeTool: null})
    }

    handleObjectCreate(event) {
        const newObject = new objects[event.type](event.props)
        this.model.add(newObject)
        this.forceUpdate()
        return newObject
    }

    handleShallowObjectChange(event) {
        this.model.update(event.id, event.newValues)
        this.emit({
            type: "objectchange",
            details: event
        })
    }

    handleObjectChange(event) {
        this.handleShallowObjectChange(event)
        this.forceUpdate()
    }

    async handleObjectRemove(id, skipVerification = false) {
        if (!skipVerification) {
            const objectName = this.model.getObjectById(id).name
            const shouldRemove = await Dialog.verify({
                content: Strings.Dialogs.Verifications.Remove.Content.replace("{}", objectName),
                subContent: Strings.Dialogs.Verifications.Remove.SubContent
            })

            if(!shouldRemove) {
                return
            }
        }

        this.model.remove(id)
        this.forceUpdate()
    }

    handleOutputCreate(event) {
        this.setState({renderOutput: event.type})
    }

    handleOutputClose() {
        this.setState({renderOutput: null})
    }

    handleModelLoad(json) {
        this.model.reset()
        this.forceUpdate()
        
        waitFrames(() => {
            this.setModel(Model.loadJSON(json))
        }, 2)
    }

    handleModelReset() {
        this.setModel(new Model(Strings.Model.UnnamedModel))
        this.forceUpdate()
    }

    render() {
        window.model = this.model

        return (
            <div className="app">
                <AppContext.Provider value={this.state.contextValue}>
                    <Toolbar/>

                    <Workspace/>

                    {this.state.renderOutput && React.createElement(outputRenderers[this.state.renderOutput])}
                </AppContext.Provider>
            </div>
        )
    }
}

export default App
export {
    AppContext
}