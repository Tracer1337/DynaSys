import React, { Component } from "react"

import Dialog from "../Dialog/Dialog.js"
import Strings from "config/strings.json"
import "./Tool.scss"

function createTool(Child, config) {
    return class Tool extends Component {
        static config = config

        state = {
            renderDialog: false,
            expanded: false
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
            this.props.onChange({id: this.props.object.id, newValues: state})
            this.setState({renderDialog: false})
        }

        handleClick() {
            // Check if the user wants to interact with this tool
            if(this.props.unSettled || !this.props.requestClick()) {
                return
            }
            
            this.requestDialog()
        }

        handleExpand() {
            this.setState({expanded: true})
        }

        componentDidMount() {
            if(this.props.getDomRef) {
                this.props.getDomRef(this.container)
            }

            this.requestDialog()
        }

        render() {
            const object = this.props.object || {}

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
                        defaultValue: object.value
                    },
                    object.hasInput !== false && {
                        label: Strings.Dialogs.Tools.Inputs,
                        type: "list",
                        items: Array.isArray(object.inputs) ? object.inputs.map(object => object.hasOutput && ({
                            type: "textbox",
                            value: object.name
                        })).filter(e => e) : []
                    },
                    {
                        type: "submit",
                        value: Strings.Dialogs.Tools.Submit
                    }
                ].filter(e => e)
            }
            
            return (
                <div 
                    className={`tool ${this.props.isMoving ? "moving" : ""} ${Tool.config.className || ""} ${this.state.expanded ? "full-size" : ""}`} 
                    ref={ref => this.container = ref}
                    style={{left: object.x, top: object.y}}
                >
                    <Child
                        ref={ref => this.child = ref}
                        label={this.props.unSettled || !object.name ? "?" : object.name}
                        object={object}
                        onObjectCreate={this.props.onObjectCreate}
                        onSettle={this.props.onSettle}
                        unSettled={this.props.unSettled}
                        getObjectById={this.props.getObjectById}
                        onChange={this.props.onChange}
                        onClick={this.handleClick.bind(this)}
                        getDomObjectById={this.props.getDomObjectById}
                        onExpand={this.handleExpand.bind(this)}
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