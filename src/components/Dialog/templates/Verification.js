import React from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"

export default ({content, subContent}) => {
    return new Promise(resolve => {
        const eventEmitter = new EventTarget()
        const container = document.createElement("div")

        eventEmitter.addEventListener("answer", ({ detail: { value } }) => {
            ReactDOM.unmountComponentAtNode(container)
            resolve(value)
        })

        ReactDOM.render(
            <Dialog
                fields={[
                    {
                        type: "title",
                        value: Strings.Dialogs.Verifications.Title
                    },
                    {
                        type: "textbox",
                        value: content
                    },
                    subContent && (
                        {
                            type: "textbox",
                            value: subContent
                        }
                    ),
                    {
                        type: "button",
                        label: Strings.Dialogs.Verifications.Accept,
                        onClick: () => eventEmitter.dispatchEvent(new CustomEvent("answer", { detail: { value: true } }))
                    },
                    {
                        type: "button",
                        label: Strings.Dialogs.Verifications.Decline,
                        onClick: () => eventEmitter.dispatchEvent(new CustomEvent("answer", { detail: { value: false } }))
                    }
                ]}
            />
        , container)
    })
}