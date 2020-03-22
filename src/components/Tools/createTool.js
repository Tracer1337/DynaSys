import React, { Component } from "react"

import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
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
            if(Tool.config.dialogAvailable && !this.props.isMoving && !this.props.unSettled && !this.state.renderDialog) {
                this.setState({ renderDialog: true })
            }
        }
        
        handleSubmit(state) {
            this.props.onObjectChange({id: this.props.object.id, newValues: state})
            this.setState({renderDialog: false})
        }

        handleClick() {
            // Check if the user wants to interact with this tool
            if(this.props.unSettled || !this.props.requestClick()) {
                return
            }
            
            this.requestDialog()
        }

        handleInputClick(object) {
            this.valueInput.append(object.name)
        }

        handleRemove() {
            this.props.onObjectRemove(this.props.object.id)
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
        }

        render() {
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
                        name: "value",
                        label: Strings.Dialogs.Tools.Value,
                        type: "string",
                        defaultValue: object.value,
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
                <div 
                    className={`tool ${this.props.isMoving ? "moving" : ""} ${Tool.config.className || ""}`} 
                    ref={ref => this.container = ref}
                    style={{left: object.x, top: object.y}}
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
        }
    }
}

export default createTool