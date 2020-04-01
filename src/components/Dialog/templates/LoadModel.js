import React, { useState } from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"
import presets from "src/Model/Presets/Presets.js"
import { getModels, setModels as setStoredModels } from "src/utils/models.js"

const LoadModel = ({ appContext, onClose }) => {
    const [models, setStateModels] = useState(getModels())
    const { model, onModelLoad } = appContext

    const setModels = newModels => {
        setStoredModels(newModels)
        setStateModels(newModels)
    }

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
    const handleRemove = async removeModel => {
        const shouldRemove = await Dialog.verify({
            content: Strings["Dialogs.Verifications.RemoveModel.Content"].replace("{}", removeModel.name),
            subContent: Strings["Dialogs.Verifications.RemoveModel.SubContent"]
        })

        if(!shouldRemove) {
            return
        }
    
        const newModels = []

        for (let savedModel of models) {
            if (savedModel.name !== removeModel.name) {
                newModels.push(savedModel)
            }
        }

        setModels(newModels)
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
                onClick: () => handleLoad(object)
            }))
        },
        {
            type: "list",
            label: Strings["Model.LoadModal.Saved"],
            items: getModels().map(object => ({
                type: "listItem",
                value: object.name,
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