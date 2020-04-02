import React, { Component } from "react"
import ReactDOM from "react-dom"

import { AppContext } from "src/App.js"
import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.js"
import { saveModel } from "src/utils/storage.js"
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
                    label: Strings["Dialogs.Outputs.Available"],
                    items: this.context.model.getObjects().map(object => {
                        if (this.state.selectedObjects.includes(object) || !object.hasOutput) {
                            return false
                        }

                        return {
                            type: "listItem",
                            value: object.mask(object.name),
                            masked: true,
                            id: object.id,
                            onClick: () => this.setState({ selectedObjects: [...this.state.selectedObjects, object] })
                        }
                    }).filter(e => e)
                },
                {
                    type: "list",
                    label: Strings["Dialogs.Outputs.Selected"],
                    items: this.state.selectedObjects.map(object => ({
                        type: "listItem",
                        value: object.mask(object.name),
                        masked: true,
                        id: object.id,
                        onClick: () => this.setState({ selectedObjects: this.state.selectedObjects.filter(selected => selected.id !== object.id) })
                    }))
                },
                this.state.renderSelectedObjectsWarning && {
                    type: "warning",
                    value: Strings["Dialogs.Warnings.SelectObjects"]
                },
                {
                    type: "submit",
                    inline: true,
                    value: Strings["Dialogs.Outputs.Submit"]
                },
                {
                    type: "button",
                    inline: true,
                    value: Strings["Dialogs.Close"],
                    onClick: this.context.onOutputClose
                }
            ].filter(e => e)
        }

        handleSubmit() {
            // Display warning if no objects are selected
            if(this.state.selectedObjects.length === 0) {
                this.setState({ renderSelectedObjectsWarning: true })
            } else {
                this.context.model.selectedObjects = this.state.selectedObjects
                saveModel(this.context.model)
                this.setState({ renderDialog: false })
            }
        }

        componentDidMount() {
            this.setState({ selectedObjects: this.context.model.selectedObjects })
        }

        render() {
            return (
                <AppContext.Consumer>
                    {context => {
                        this.context = context

                        // Display a warning if there are no objects or if some objects have no value
                        let error = false

                        if (this.context.model.getObjects().length === 0) {
                            Dialog.warn(Strings["Dialogs.Warnings.NoObjects"])
                            error = true

                        } else if (this.context.model.getObjects().some(object => object.hasOutput ? !object.value : false)) {
                            const missingObjects = this.context.model.getObjects()
                                .filter(object => object.hasOutput ? !object.value : false)
                                .map(object => object.name)
                                .join(", ")

                            const message = Strings["Dialogs.Warnings.MissingValues"].replace("{}", missingObjects)
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
                            <Dialog
                                fields={[
                                    {
                                        type: "title",
                                        value: Output.config.label
                                    },
                                    {
                                        type: "element",
                                        value: () => <Child
                                            selectedObjects={this.state.selectedObjects}
                                            model={this.context.model}
                                        />
                                    },
                                    {
                                        type: "button",
                                        value: Strings["Outputs.Close"],
                                        onClick: this.context.onOutputClose
                                    }
                                ]}
                            />
                        , document.getElementById("root"))
                    }}
                </AppContext.Consumer>
            )
        }
    }
}

export default createOutput