import React, { Component } from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
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
            if(this.props.model.getObjects().length === 0) {
                return (
                    <Dialog
                        fields={[{
                            type: "textbox",
                            value: Strings.Dialogs.OutputWarning.Text
                        }, {
                            type: "submit",
                            value: Strings.Dialogs.OutputWarning.Accept
                        }]}
                        onSubmit={this.props.onClose}
                    />
                )
            }

            const dialogFields = [
                {
                    type: "title",
                    value: Output.config.label
                },
                {
                    type: "list",
                    label: Strings.Dialogs.Outputs.Available,
                    items: this.props.model.getObjects().map(object => {
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
                    onClick: this.props.onClose
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
                    <div className="content">
                        <Child
                            selectedObjects={this.state.selectedObjects}
                            {...this.props}
                        />
                        <button onClick={this.props.onClose}>{Strings.Outputs.Close}</button>
                    </div>
                </div>
            , document.getElementById("root"))
        }
    }
}

export default createOutput