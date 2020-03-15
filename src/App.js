import React, { Component } from "react"

import Workspace from "./components/Workspace/Workspace.js"
import Toolbar from "./components/Toolbar/Toolbar.js"

import objects from "./Model/Objects/Objects.js"
import Model from "./Model/Model.js"

import "./App.scss"

class App extends Component {
    state = {
        activeTool: null
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
        this.model.update(event.id, event.newState)
        this.forceUpdate()
    }

    render() {
        window.model = this.model
        return (
            <div className="app">
                <Toolbar 
                    onActiveToolChange={this.handleActiveToolChange.bind(this)} 
                    ref={ref => this.toolbar = ref}
                />
                <Workspace 
                    activeTool={this.state.activeTool} 
                    onSettle={this.handleSettle.bind(this)}
                    onObjectCreate={this.handleObjectCreate.bind(this)}
                    onObjectChange={this.handleObjectChange.bind(this)}
                    objects={this.model.getObjects()}
                />
            </div>
        )
    }
}

export default App
