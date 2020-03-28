import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"
import Dialog from "./components/Dialog/Dialog.js"

import objects from "./Model/Objects/Objects.js"
import outputRenderers from "./components/Outputs/Outputs.js"
import Model from "./Model/Model.js"
import waitFrames from "./utils/waitFrames.js"
import Strings from "./config/strings.js"
import SettingsProvider from "./config/SettingsProvider.js"

import "./App.scss"

const AppContext = React.createContext({})

class App extends Component {
    model = new Model(Strings["Model.UnnamedModel"])

    snapshots = []

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
            onModelReset: this.handleModelReset.bind(this),

            createSnapshot: this.createSnapshot.bind(this)
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

    createSnapshot() {
        this.model.makePreset()
        this.snapshots.push(Model.clone(this.model))

        if (this.snapshots.length > SettingsProvider.settings.maxSnapshots.value) {
            this.snapshots.shift()
        }
    }

    applyLastSnapshot() {
        if (this.snapshots.length === 0) {
            return
        }

        const json = JSON.stringify(this.snapshots.pop())
        this.handleModelLoad(JSON.parse(json))
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
        this.createSnapshot()

        const newObject = new objects[event.type](event.props)
        this.model.add(newObject)
        this.forceUpdate()
        return newObject
    }

    handleShallowObjectChange(event, shouldCreateSnapshot = true) {
        if(shouldCreateSnapshot) {
            this.createSnapshot()
        }

        this.model.update(event.id, event.newValues, shouldCreateSnapshot)
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
                content: Strings["Dialogs.Verifications.Remove.Content"].replace("{}", objectName),
                subContent: Strings["Dialogs.Verifications.Remove.SubContent"]
            })
            
            if(!shouldRemove) {
                return
            }
        }
        this.createSnapshot()

        this.model.remove(id)
        this.forceUpdate()
    }

    handleOutputCreate(event) {
        this.setState({renderOutput: event.type})
    }

    handleOutputClose() {
        this.setState({renderOutput: null})
    }

    handleModelLoad(object) {
        this.model.reset()
        this.forceUpdate()
        
        waitFrames(() => {
            this.setModel(Model.loadObject(object))
        }, 2)
    }

    handleModelReset() {
        this.createSnapshot()
        this.setModel(new Model(Strings["Model.UnnamedModel"]))
        this.forceUpdate()
    }

    handleKeyDown(event) {
        if(event.ctrlKey && event.keyCode === 90) {
            this.applyLastSnapshot()
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this))
    }

    render() {
        window.model = this.model
        window.snapshots = this.snapshots

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