import React, { Component } from "react"

import tools from "../../Tools/Tools.js"
import constrain from "src/utils/constrain.js"
import { AppContext } from "src/App.js"
import "./ToolSpace.scss"

class ToolSpace extends Component {
    state = {
        tools: [],
        defaultToolProps: {
            onObjectCreate: this.createObject.bind(this),
            requestClick: this.requestClick.bind(this),
            onSettle: this.onSettle.bind(this)
        },
        isMoving: false,
        selectedObjectId: null,
    }

    renderedIds = []
    toolRefs = {}

    idCounter = 0

    mouseOver = {}
    isMouseDown = false
    preventDialog = false

    container = React.createRef()

    getObjectPositionById(id) {
        const objects = Array.from(this.container.current.getElementsByClassName("object"))
        const result = objects.find(object => parseInt(object.dataset.id) === id)

        if (!result) {
            return undefined
        }

        const rect = result.getBoundingClientRect()
        const containerRect = this.container.current.getBoundingClientRect()
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
        if(this.preventDialog) {
            this.preventDialog = false
            return false
        }

        return !this.context.activeTool && !this.props.isMouseDown
    }

    filterNewTools(objects) {
        const newTools = []

        for(let object of objects) {
            this.renderedIds.push(object.id)
    
            const tool = tools[object.type]
    
            if (!tool) {
                throw new Error("[Workspace] Tool '" + object.type + "' does not exist")
            }
    
            // Create the new object and render it into the workspace
            const newTool = React.createElement(tool, {
                key: object.id,
                ref: ref => this.toolRefs[object.id] = ref,
                object,
                onMouseOver: this.handleMouseOver.bind(this),
                onMouseOut: this.handleMouseOut.bind(this),
                ...this.state.defaultToolProps,
                ...this.props
            })
    
            newTools.push(newTool)
        }

        return newTools
    }

    filterRemovedTools(removedIds) {
        const remainingTools = this.state.tools.filter(tool => !removedIds.includes(parseInt(tool.key)))
        this.renderedIds = this.renderedIds.filter(id => !removedIds.includes(id))
        return remainingTools
    }

    handleMouseOver({target, id, isMovable}) {
        if(!this.state.isMoving && !this.isMouseDown) {
            this.mouseOver = { target, id, isMovable }
        }
    }

    handleMouseOut() {
        if(!this.state.isMoving) {
            this.mouseOver = {}
        }
    }

    handleMouseDown() {
        this.isMouseDown = true

        if(this.mouseOver.id) {
            this.setState({ selectedObjectId: this.mouseOver.id })
        }
    }

    handleMouseUp() {
        this.isMouseDown = false
    }

    handleMouseMove(event) {
        const objectDomElement = this.context.activeTool ? this.currentToolDomElement : this.mouseOver.target
        const isMovingWhenSettled = this.isMouseDown && this.mouseOver.target && this.mouseOver.isMovable

        if (this.context.activeTool || isMovingWhenSettled) {
            if(!this.state.isMoving) {
                this.setState({isMoving: true})
            }

            const containerRect = this.container.current.getBoundingClientRect()

            const mouseX = event.clientX - containerRect.x
            const mouseY = event.clientY - containerRect.y

            const newX = this.currentX = constrain(mouseX - objectDomElement.offsetWidth / 2, 0, containerRect.width - objectDomElement.offsetWidth)
            const newY = this.currentY = constrain(mouseY - objectDomElement.offsetHeight / 2, 0, containerRect.height - objectDomElement.offsetHeight)

            objectDomElement.style.transform = `translate(${newX}px, ${newY}px)`

            if(isMovingWhenSettled) {
                this.preventDialog = true
                this.context.onShallowObjectChange({id: this.mouseOver.id, newValues: {x: newX, y: newY}})
            }
        } else {
            if(this.state.isMoving) {
                this.setState({
                    isMoving: false
                })
            }
        }
    }

    handleClick(event) {
        if (this.context.activeTool) {
            this.currentToolRef.userSettled({ object: this.context.model.getObjectById(parseInt(event.target.dataset.id)) })
        }

        if(event.target === this.container.current && this.selectedObjectId !== null) {
            this.setState({ selectedObjectId: null })
        }
    }

    handleKeyDown(event) {
        // DEL -> Remove selected object
        if(event.keyCode === 46) {
            let skipVerification = false
            if(event.shiftKey) {
                skipVerification = true
            }

            this.context.onObjectRemove(this.state.selectedObjectId, skipVerification)
            this.setState({ selectedObjectId: null })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Deselect old selection and select the new selection
        if(this.state.selectedObjectId !== prevState.selectedObjectId) {
            if(this.toolRefs[prevState.selectedObjectId]) {
                this.toolRefs[prevState.selectedObjectId].unselect()
            }

            if(this.toolRefs[this.state.selectedObjectId]) {
                this.toolRefs[this.state.selectedObjectId].select()
            }
        }

        // Set idCounter to a higher value than the highest in objects
        this.context.model.getObjects().forEach(object => object.id >= this.idCounter ? (this.idCounter = object.id + 1) : null)
        
        // Add new Objects
        const newObjects = this.context.model.getObjects().filter(object => !this.renderedIds.includes(object.id))

        const newTools = this.filterNewTools(newObjects)

        // Remove removed objects
        const removedIds = this.renderedIds.filter(id => !this.context.model.getObjects().some(object => object.id === id))

        const remainingTools = this.filterRemovedTools(removedIds)

        if (newTools.length || remainingTools.length !== this.state.tools.length) {
            this.setState({tools: [...remainingTools, ...newTools]})
        }
    }

    componentDidMount() {
        this.props.acrossSpaceCommunication.set("ToolSpace", {
            getObjectPositionById: this.getObjectPositionById.bind(this)
        })

        this.setState({
            defaultToolProps: {
                ...this.state.defaultToolProps,
                container: this.container
            }
        })

        window.addEventListener("mousemove", this.handleMouseMove.bind(this))
    }

    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    const CurrentTool = this.currentTool = tools[this.context.activeTool]

                    return (
                        <div
                            className={`space tool-space ${this.state.isMoving ? "moving" : ""}`}
                            ref={this.container}
                            onMouseDown={this.handleMouseDown.bind(this)}
                            onMouseUp={this.handleMouseUp.bind(this)}
                            onClick={this.handleClick.bind(this)}
                            onKeyDown={this.handleKeyDown.bind(this)}
                            tabIndex="0"
                        >
                            {CurrentTool && (
                                <CurrentTool
                                    unSettled
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