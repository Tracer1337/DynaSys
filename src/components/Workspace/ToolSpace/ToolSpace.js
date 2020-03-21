import React, { Component } from "react"

import tools from "../../Tools/Tools.js"
import constrain from "src/utils/constrain.js"
import {AppContext} from "src/App.js"
import "./ToolSpace.scss"

class ToolSpace extends Component {
    state = {
        tools: [],
        defaultToolProps: {
            onObjectCreate: this.createObject.bind(this),
            requestClick: this.requestClick.bind(this),
            onSettle: this.onSettle.bind(this)
        }
    }

    toolRefs = {}

    renderedIds = []

    idCounter = 0

    getObjectPositionById = (id) => {
        const objects = Array.from(this.container.getElementsByClassName("object"))
        const result = objects.find(object => parseInt(object.dataset.id) === id)

        if (!result) {
            return undefined
        }

        const rect = result.getBoundingClientRect()
        const containerRect = this.container.getBoundingClientRect()
        const position = { x: rect.x - containerRect.x + rect.width / 2, y: rect.y - containerRect.y + rect.height / 2 }

        return position
    }

    createObject({ type, settled, props }) {
        const newId = this.idCounter++

        const newObject = this.context.onObjectCreate({
            type: type,
            props: {
                id: newId,
                x: this.currentX,
                y: this.currentY,
                name: tools[type].config.label + newId,
                ...props
            }
        })

        if (settled && this.context.onSettle) {
            this.onSettle()
        }

        return newObject
    }

    onSettle() {
        this.context.onSettle()
    }

    requestClick() {
        return !this.context.activeTool
    }

    handleMouseMove(event) {
        if (this.context.activeTool) {
            const containerRect = this.container.getBoundingClientRect()

            const mouseX = event.clientX - containerRect.x
            const mouseY = event.clientY - containerRect.y

            const newX = this.currentX = constrain(mouseX - this.currentToolDomElement.offsetWidth / 2, 0, this.container.offsetWidth - this.currentToolDomElement.offsetWidth)
            const newY = this.currentY = constrain(mouseY - this.currentToolDomElement.offsetHeight / 2, 0, this.container.offsetHeight - this.currentToolDomElement.offsetHeight)

            this.currentToolDomElement.style.transform = `translate(${newX}px, ${newY}px)`
        }
    }

    handleClick(event) {
        if (this.context.activeTool) {
            this.currentToolRef.userSettled({ object: this.context.model.getObjectById(parseInt(event.target.dataset.id)) })
        }
    }

    componentDidMount() {
        this.setState({defaultToolProps: {...this.state.defaultToolProps,
            getObjectById: this.context.model.getObjectById,
            onObjectChange: this.context.onObjectChange
        }})
    }

    componentDidUpdate() {
        // Render new objects of the model
        const newTools = []

        for (let object of this.context.model.getObjects()) {
            // Check if object is already rendered on the workspace
            if (!this.renderedIds.includes(object.id)) {
                this.renderedIds.push(object.id)

                const tool = tools[object.type]

                if (!tool) {
                    throw new Error("[Workspace] Tool '" + object.type + "' does not exist")
                }

                // Create the new object and render it into the workspace
                const newTool = React.createElement(tool, {
                    key: object.id,
                    object,
                    domRef: ref => this.toolRefs[object.id] = ref,
                    ...this.state.defaultToolProps,
                    ...this.props
                })

                newTools.push(newTool)
            }
        }

        if (newTools.length) {
            this.setState({ tools: [...this.state.tools, ...newTools] })
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    const CurrentTool = this.currentTool = tools[this.context.activeTool]

                    return (
                        <div
                            className="space tool-space"
                            ref={ref => this.container = ref}
                            onMouseMove={this.handleMouseMove.bind(this)}
                            onClick={this.handleClick.bind(this)}
                        >
                            {CurrentTool && (
                                <CurrentTool
                                    unSettled
                                    isMoving
                                    ref={ref => this.currentToolRef = ref}
                                    getDomRef={ref => this.currentToolDomElement = ref}
                                    {...this.state.defaultToolProps}
                                    {...this.props}
                                />
                            )}

                            {this.state.tools}
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default ToolSpace