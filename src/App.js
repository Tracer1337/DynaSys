import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"

import objects from "./Model/Objects/Objects.js"
import presets from "./Model/Presets/Presets.js"
import outputRenderers from "./components/Outputs/Outputs.js"
import Model from "./Model/Model.js"

import "./App.scss"

const AppContext = React.createContext({})

class App extends Component {
    model = new Model()

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
            removeEventListener: this.removeEventListener.bind(this)
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

    handleObjectRemove(id) {
        this.model.remove(id)
        this.forceUpdate()
    }

    handleOutputClick(event) {
        this.setState({renderOutput: event.type})
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