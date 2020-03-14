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

    handleMouseMove(event) {
        if(this.props.activeTool !== -1) {
            const mouseX = event.clientX - this.container.offsetLeft - this.currentToolDom.offsetWidth / 2
            const mouseY = event.clientY - this.container.offsetTop - this.currentToolDom.offsetHeight / 2

            const newX = this.currentX = constrain(mouseX, 0, this.container.offsetWidth - this.currentToolDom.offsetWidth)
            const newY = this.currentY = constrain(mouseY, 0, this.container.offsetHeight - this.currentToolDom.offsetHeight)

            this.currentToolDom.style.transform = `translate(${newX}px, ${newY}px)`
        }
    }

    handleClick() {
        if(this.props.activeTool !== -1) {
            this.props.onObjectCreate({
                type: this.currentTool.config.type,
                props: {
                    id: idCounter++,
                    x: this.currentX, 
                    y: this.currentY
                }
            })
        }
    }

    componentDidMount() {
        this.container.addEventListener("mousemove", this.handleMouseMove.bind(this))
        this.container.addEventListener("click", this.handleClick.bind(this))
    }

    componentDidUpdate() {
        // Render new objects of the model
        for(let object of this.props.objects) {

            // Check if object is already rendered on the workspace
            if(!this.renderedIds.includes(object.id)) {
                this.renderedIds.push(object.id)

                const newTool = React.createElement(this.currentTool, {
                    key: this.props.activeTool + this.currentX + this.currentY,
                    onObjectCreate: this.props.onObjectCreate,
                    onChange: this.props.onObjectChange,
                    x: this.currentX,
                    y: this.currentY,
                    object
                })

                this.setState({tools: [...this.state.tools, newTool]})

                if(this.props.onSettle) {
                    this.props.onSettle()
                }
            }
        }
    }

    render() {
        const CurrentTool = this.currentTool = tools[this.props.activeTool]

        return (
            <div className="workspace" ref={ref => this.container = ref}>
                {CurrentTool && (
                    <CurrentTool
                        unSettled
                        isMoving
                        ref={ref => this.currentToolRef = ref}
                        getDomRef={ref => this.currentToolDom = ref}
                    />
                )}
                {this.state.tools}
            </div>
        )
    }
}

export default Workspace