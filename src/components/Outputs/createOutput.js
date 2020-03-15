import React, { Component } from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog/Dialog.js"
import Strings from "config/strings.json"
import "./Output.scss"

function createOutput(Child, config) {
    return class Output extends Component {
        static config = config

        state = {
            renderDialog: true,
            selectedObjects: []
        }

        handleSubmit() {
            this.setState({renderDialog: false})
        }

        render() {
            const dialogFields = [
                {
                    type: "title",
                    value: Output.config.label
                },
                {
                    type: "list",
                    label: Strings.Dialogs.Outputs.Available,
                    items: this.props.model.getObjects().map(object => {
                        if (this.state.selectedObjects.includes(object)) {
                            return false
                        }
                        
                        return {
                            type: "button",
                            label: object.name,
                            id: object.id,
                            onClick: () => this.setState({ selectedObjects: [...this.state.selectedObjects, object] })
                        }
                    }).filter(e => e)
                },
                {
                    type: "list",
                    label: Strings.Dialogs.Outputs.Selected,
                    items: this.state.selectedObjects.map(object => ({
                        type: "button",
                        label: object.name,
                        id: object.id,
                        onClick: () => this.setState({ selectedObjects: this.state.selectedObjects.filter(selected => selected.id !== object.id) })
                    }))
                },
                {
                    type: "submit",
                    value: Strings.Dialogs.Outputs.Submit
                }
            ]

            if(this.state.renderDialog) {
                return (
                    <Dialog
                        fields={dialogFields}
                        onSubmit={this.handleSubmit.bind(this)}
                    />
                )
            }

            return ReactDOM.createPortal(
                <div className="output">
                    <Child
                        selectedObjects={this.state.selectedObjects}
                        {...this.props}
                    />
                </div>
            , document.getElementById("root"))
        }
    }
}

export default createOutput