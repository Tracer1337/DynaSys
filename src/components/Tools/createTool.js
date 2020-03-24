import React, { Component } from "react"

import { AppContext } from "src/App.js"
import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
import Colors from "src/config/colors.json"
import "./Tool.scss"

function createTool(Child, config) {
    return class Tool extends Component {
        static config = config

        state = {
            renderDialog: false,
            isMouseDown: false
        }

        preventClick = false

        userSettled = (event) => {
            this.child.userSettled(event)
        }

        requestDialog() {
            const isMoving = this.props.isMoving || this.state.isMouseDown
            if(Tool.config.dialogAvailable && !isMoving && !this.props.unSettled && !this.state.renderDialog) {
                this.setState({ renderDialog: true })
            }
        }

        handleObjectChange() {
            if (!this.lastObject || !this.props.object) {
                return
            }

            if (this.lastObject.x !== this.props.object.x || this.lastObject.y !== this.props.object.y) {
                this.forceUpdate()
            }
        }
        
        handleSubmit(state) {
            this.context.onObjectChange({id: this.props.object.id, newValues: state})
            this.setState({renderDialog: false})
        }

        handleClick() {
            // Check if the user wants to interact with this tool
            if(this.props.unSettled || !this.props.requestClick() || this.preventClick) {
                this.preventClick = false
                return
            }
            
            this.requestDialog()
        }

        handleInputClick(object) {
            this.valueInput.append(object.name)
        }

        handleFunctionClick(fn) {
            this.valueInput.append(fn)
        }

        handleRemove() {
            this.context.onObjectRemove(this.props.object.id)
        }

        handleMouseMove(event) {
            if(!Tool.config.isMovable) {
                return
            }

            if(this.state.isMouseDown && this.props.object) {
                this.preventClick = true

                const containerRect = this.props.container.current.getBoundingClientRect()

                const newX = event.clientX - containerRect.x - this.container.offsetWidth / 2
                const newY = event.clientY - containerRect.y - this.container.offsetHeight / 2

                this.container.style.left = newX + "px"
                this.container.style.top = newY + "px"

                this.context.onShallowObjectChange({id: this.props.object.id, newValues: {x: newX, y: newY}})
            }
        }

        handleMouseDown() {
            if(Tool.config.isMovable && !this.state.renderDialog) {
                this.setState({isMouseDown: true})
            }
        }

        handleMouseUp() {
            if(Tool.config.isMovable && !this.state.renderDialog) {
                this.setState({isMouseDown: false})
            }
        }

        componentDidMount() {
            // Create connections for presetted objects
            if(this.props.object && this.props.object.isPresetted) {
                requestAnimationFrame(() => this.forceUpdate())
            }

            if(this.props.getDomRef) {
                this.props.getDomRef(this.container)
            }

            if(!this.props.object || !this.props.object.isPresetted) {
                this.requestDialog()
            }

            window.addEventListener("mousemove", this.handleMouseMove.bind(this))
            this.context.addEventListener("objectchange", this.handleObjectChange.bind(this))
        }

        render() {
            this.lastObject = this.props.object && this.props.object.clone()
            
            const object = this.props.object || {}
            const isMoving = this.props.isMoving || this.state.isMouseDown

            this.id = object.id

            let dialogFields

            if (Tool.config.dialogAvailable) {
                dialogFields = [
                    {
                        type: "title",
                        value: Tool.config.label
                    },
                    {
                        name: "name",
                        label: Strings.Dialogs.Tools.Name,
                        type: "string",
                        defaultValue: object.name
                    },
                    {
                        name: "color",
                        label: Strings.Dialogs.Tools.Color,
                        type: "select",
                        options: Colors.map(color => ({
                            value: color,
                            label: color
                        })),
                        defaultValue: object.color || Colors[0]
                    },
                    {
                        name: "value",
                        label: Strings.Dialogs.Tools.Value,
                        type: "string",
                        defaultValue: object.value || "",
                        ref: ref => this.valueInput = ref
                    },
                    object.hasInput !== false && {
                        label: Strings.Dialogs.Tools.Inputs,
                        type: "list",
                        items: Array.isArray(object.inputs) ? [{
                            type: "button",
                            label: Strings.Dialogs.Tools.Time,
                            onClick: () => this.handleInputClick({name: "t"})
                        }].concat(object.inputs.map(object => object.hasOutput && ({
                            type: "button",
                            label: object.name,
                            onClick: () => this.handleInputClick(object)
                        })).filter(e => e)) : []
                    },
                    {
                        type: "functions",
                        label: Strings.Dialogs.Tools.Functions,
                        onClick: this.handleFunctionClick.bind(this)
                    },
                    {
                        type: "submit",
                        value: Strings.Dialogs.Tools.Submit
                    },
                    {
                        type: "button",
                        label: Strings.Dialogs.Tools.Remove,
                        onClick: this.handleRemove.bind(this)
                    }
                ].filter(e => e)
            }
            
            return (
                <AppContext.Consumer>
                    {context => {
                        this.context = context

                        return (
                            <div
                                className={`tool ${isMoving ? "moving" : ""} ${Tool.config.className || ""}`}
                                ref={ref => this.container = ref}
                                style={{ left: object.x, top: object.y }}
                                onMouseDown={this.handleMouseDown.bind(this)}
                                onMouseUp={this.handleMouseUp.bind(this)}
                            >
                                <Child
                                    ref={ref => this.child = ref}
                                    label={this.props.unSettled || !object.name ? "?" : object.name}
                                    object={object}
                                    onClick={this.handleClick.bind(this)}
                                    {...this.props}
                                />
                                {this.state.renderDialog && (
                                    <Dialog
                                        fields={dialogFields}
                                        onSubmit={this.handleSubmit.bind(this)}
                                    />
                                )}
                            </div>
                        )
                    }}
                </AppContext.Consumer>
            )
        }
    }
}

export default createTool