import React, { Component } from "react"

import tools from "../Tools/Tools.js"
import "./Workspace.scss"

const constrain = (x, min, max) => Math.min(Math.max(x, min), max)

let idCounter = 0

class Workspace extends Component {
    state = {
        tools: []
    }

    renderedIds = []

    defaultToolProps = {
        onObjectCreate: this.createObject.bind(this),
        requestClick: this.requestClick.bind(this),
        onSettle: this.onSettle.bind(this),
        getObjectById: this.props.getObjectById,
        onChange: this.props.onObjectChange,
    }

    createObject({type, settled, props}) {
        const newId = idCounter++

        const newObject = this.props.onObjectCreate({
            type: type,
            props: {
                id: newId,
                x: this.currentX,
                y: this.currentY,
                name: tools[type].config.label + " " + newId,
                ...props
            }
        })

        if(settled && this.props.onSettle) {
            this.onSettle()
        }

        return newObject
    }

    onSettle() {
        this.props.onSettle()
    }

    requestClick() {
        return !this.props.activeTool
    }

    handleMouseMove(event) {
        if(this.props.activeTool) {
            const mouseX = event.clientX - this.container.offsetLeft
            const mouseY = event.clientY - this.container.offsetTop

            const newX = this.currentX = constrain(mouseX - this.currentToolDom.offsetWidth / 2, 0, this.container.offsetWidth - this.currentToolDom.offsetWidth)
            const newY = this.currentY = constrain(mouseY - this.currentToolDom.offsetHeight / 2, 0, this.container.offsetHeight - this.currentToolDom.offsetHeight)

            this.currentToolDom.style.transform = `translate(${newX}px, ${newY}px)`
        }
    }

    handleClick(event) {
        if(this.props.activeTool) {
            this.currentToolRef.userSettled({object: this.props.getObjectById(parseInt(event.target.id))})
        }
    }

    componentDidUpdate() {
        // Render new objects of the model
        const newTools = []
        
        for(let object of this.props.objects) {

            // Check if object is already rendered on the workspace
            if(!this.renderedIds.includes(object.id)) {
                this.renderedIds.push(object.id)

                const tool = tools[object.constructor.name]

                if(!tool) {
                    throw new Error("[Workspace] Tool '"+object.constructor.name+"' does not exist")
                }

                // Create the new object and render it into the workspace
                const newTool = React.createElement(tool, {
                    key: object.id,
                    object,
                    ...this.defaultToolProps
                })

                newTools.push(newTool)
            }
        }

        if(newTools.length) {
            this.setState({tools: [...this.state.tools, ...newTools]})
        }
    }

    render() {
        const CurrentTool = this.currentTool = tools[this.props.activeTool]

        return (
            <div 
                className="workspace" 
                ref={ref => this.container = ref}
                onMouseMove={this.handleMouseMove.bind(this)}
                onClick={this.handleClick.bind(this)}
            >
                {CurrentTool && (
                    <CurrentTool
                        unSettled
                        isMoving
                        ref={ref => this.currentToolRef = ref}
                        getDomRef={ref => this.currentToolDom = ref}
                        {...this.defaultToolProps}
                    />
                )}
                {this.state.tools}
            </div>
        )
    }
}

export default Workspace