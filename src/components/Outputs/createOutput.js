import React, { Component } from "react"
import ReactDOM from "react-dom"

import { AppContext } from "src/App.js"
import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.js"
import "./Output.scss"

function createOutput(Child, config) {
    return class Output extends Component {
        static config = config

        state = {
            renderDialog: true,
            renderSelectedObjectsWarning: false,
            selectedObjects: []
        }

        dialogFields() {
            return [
                {
                    type: "title",
                    value: Output.config.label
                },
                {
                    type: "list",
                    label: Strings.Dialogs.Outputs.Available,
                    items: this.context.model.getObjects().map(object => {
                        if (this.state.selectedObjects.includes(object) || !object.hasOutput) {
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
                this.state.renderSelectedObjectsWarning && {
                    type: "textbox",
                    value: Strings.Dialogs.Warnings.SelectObjects
                },
                {
                    type: "setting",
                    name: "timesteps"
                },
                {
                    type: "setting",
                    name: "interval"
                },
                {
                    type: "submit",
                    value: Strings.Dialogs.Outputs.Submit
                },
                {
                    type: "button",
                    label: Strings.Dialogs.Close,
                    onClick: this.context.onOutputClose
                }
            ].filter(e => e)
        }

        handleSubmit() {
            // Display warning if no objects are selected
            if(this.state.selectedObjects.length === 0) {
                this.setState({ renderSelectedObjectsWarning: true })
            } else {
                this.setState({ renderDialog: false })
            }
        }

        render() {
            return (
                <AppContext.Consumer>
                    {context => {
                        this.context = context

                        // Display a warning if there are no objects or if some objects have no value
                        let error = false

                        if (this.context.model.getObjects().length === 0) {
                            Dialog.warn(Strings.Dialogs.Warnings.NoObjects)
                            error = true

                        } else if (this.context.model.getObjects().some(object => object.hasOutput ? !object.value : false)) {
                            const missingObjects = this.context.model.getObjects()
                                .filter(object => object.hasOutput ? !object.value : false)
                                .map(object => object.name)
                                .join(", ")

                            const message = Strings.Dialogs.Warnings.MissingValues.replace("{}", missingObjects)
                            Dialog.warn(message)
                            error = true
                        }

                        if (error) {
                            this.context.onOutputClose()
                            return <></>
                        }

                        if(this.state.renderEmpty) {
                            return <></>
                        }

                        if (this.state.renderDialog) {
                            return (
                                <Dialog
                                    fields={this.dialogFields()}
                                    onSubmit={this.handleSubmit.bind(this)}
                                />
                            )
                        }

                        return ReactDOM.createPortal(
                            <div className="output">
                                <div className="content">
                                    <Child
                                        selectedObjects={this.state.selectedObjects}
                                        model={this.context.model}
                                    />
                                    <button onClick={this.context.onOutputClose}>{Strings.Outputs.Close}</button>
                                </div>
                            </div>
                        , document.getElementById("root"))
                    }}
                </AppContext.Consumer>
            )
        }
    }
}

export default createOutput