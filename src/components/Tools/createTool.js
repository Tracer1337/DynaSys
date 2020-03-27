import React, { Component } from "react"

import { AppContext } from "src/App.js"
import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.js"
import Colors from "src/config/colors.json"
import "./Tool.scss"

function createTool(Child, config) {
    return class Tool extends Component {
        static config = config

        state = {
            renderDialog: false
        }

        userSettled = (event) => {
            this.child.userSettled(event)
        }

        requestDialog() {
            if(Tool.config.dialogAvailable && !this.props.unSettled && !this.state.renderDialog) {
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
            if(this.props.unSettled || !this.props.requestClick()) {
                return
            }
            
            this.requestDialog()
        }

        handleMouseOver(event) {
            if(!this.props.unSettled && event.target.classList.contains("object")) {
                this.props.onMouseOver({target: this.container, id: this.id, isMovable: Tool.config.isMovable })
            }
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

            this.context.addEventListener("objectchange", this.handleObjectChange.bind(this))
        }

        render() {
            this.lastObject = this.props.object && this.props.object.clone()
            
            const object = this.props.object || {}

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
                        label: Strings.Dialogs.Tools.Close,
                        onClick: () => this.setState({renderDialog: false})
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
                                className={`tool ${Tool.config.className || ""}`}
                                ref={ref => this.container = ref}
                                style={{transform: `translate(${object.x}px, ${object.y}px)`}}
                                onMouseOver={this.handleMouseOver.bind(this)}
                                onMouseOut={this.props.onMouseOut}
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