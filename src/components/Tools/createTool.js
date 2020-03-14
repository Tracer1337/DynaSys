import React, { Component } from "react"

import Dialog from "../Dialog/Dialog.js"
import Strings from "config/strings.json"
import "./Tool.scss"

function createTool(Child, config) {
    return class Tool extends Component {
        static config = config

        state = {
            renderDialog: false
        }

        handleSubmit(state) {
            this.props.onChange({id: this.props.object.id, newState: state})
            this.setState({renderDialog: false})
        }

        handleClick() {
            if(!this.props.isMoving && !this.state.renderDialog) {
                this.setState({renderDialog: true})
            }
        }

        componentDidMount() {
            if(this.props.getDomRef) {
                this.props.getDomRef(this.container)
            }

            if(!this.props.unSettled) {
                this.setState({renderDialog: true})
            }
        }

        render() {
            let DialogFields
            
            if(!this.props.unSettled) {
                DialogFields = [
                    {
                        type: "title",
                        value: Tool.config.label
                    },
                    {
                        name: "name",
                        label: Strings.Dialogs.Tools.Name,
                        type: "string",
                        defaultValue: this.props.object.name
                    },
                    {
                        name: "value",
                        label: Strings.Dialogs.Tools.Value,
                        type: "string",
                        defaultValue: this.props.object.value
                    },
                    {
                        label: Strings.Dialogs.Tools.Inputs,
                        type: "list",
                        items: []
                    },
                    {
                        type: "submit",
                        value: Strings.Dialogs.Tools.Submit
                    }
                ]
            }

            return (
                <div 
                    className={`tool ${this.props.isMoving ? "moving" : ""}`} 
                    ref={ref => this.container = ref}
                    style={{left: this.props.x, top: this.props.y}}
                    onClick={this.handleClick.bind(this)}
                >
                    <Child
                        label={this.props.unSettled || !this.props.object.name ? "?" : this.props.object.name}
                    />
                    {this.state.renderDialog && (
                        <Dialog
                            fields={DialogFields}
                            onSubmit={this.handleSubmit.bind(this)}
                        />
                    )}
                </div>
            )
        }
    }
}

export default createTool