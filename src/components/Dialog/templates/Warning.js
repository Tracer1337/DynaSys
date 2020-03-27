import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"

export default (content) => {
    const container = document.createElement("div")

    ReactDOM.render(
        <Dialog
            fields={[{
                type: "title",
                value: Strings["Dialogs.Warnings.Title"]
            }, {
                type: "textbox",
                value: content
            }, {
                type: "submit",
                value: Strings["Dialogs.Close"]
            }]}
            onSubmit={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}