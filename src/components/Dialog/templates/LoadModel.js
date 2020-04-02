import React, { useState } from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"
import presets from "src/Model/Presets/Presets.js"
import { getModels, removeModel } from "src/utils/storage.js"

const LoadModel = ({ appContext, onClose }) => {
    const [models, setStateModels] = useState(getModels())
    const { model, onModelLoad } = appContext

    const handleLoad = async object => {
        const shouldApply = await Dialog.verify({
            content: Strings["Dialogs.Verifications.OverrideUnlessSaved.Content"].replace("{}", model.name)
        })

        if(!shouldApply) {
            return
        }

        onModelLoad(object)
        onClose()
    }
    
    // Remove the model with given name from localStorage
    const handleRemove = async model => {
        const shouldRemove = await Dialog.verify({
            content: Strings["Dialogs.Verifications.RemoveModel.Content"].replace("{}", model.name),
            subContent: Strings["Dialogs.Verifications.RemoveModel.SubContent"]
        })

        if(!shouldRemove) {
            return
        }
    
        removeModel(model)
        setStateModels(getModels())
    }

    const fields = [
        {
            type: "title",
            value: Strings["Model.LoadModal.Title"]
        },
        {
            type: "list",
            label: Strings["Model.LoadModal.Presets"],
            items: presets.map(object => ({
                type: "listItem",
                value: object.name,
                previewModel: object,
                onClick: () => handleLoad(object)
            }))
        },
        {
            type: "list",
            label: Strings["Model.LoadModal.Saved"],
            items: models.map(object => ({
                type: "listItem",
                value: object.name,
                previewModel: object,
                onClick: () => handleLoad(object),
                onRemove: () => handleRemove(object)
            }))
        },
        {
            type: "button",
            value: Strings["Model.LoadModal.Close"],
            onClick: onClose
        }
    ]

    return (
        <Dialog
            fields={fields}
        />
    )
}

export default (context) => {
    const container = document.createElement("div")

    ReactDOM.render(
        <LoadModel
            appContext={context}
            onClose={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}