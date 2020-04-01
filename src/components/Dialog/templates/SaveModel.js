import React, { useRef } from "react"
import ReactDOM from "react-dom"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"
import { getModels, setModels } from "src/utils/models.js"

const SaveModel = ({ appContext, onClose }) => {
    const { model, emit } = appContext

    const saveNameInput = useRef()

    // Add the model under the name given by data to the models in localStorage
    const handleSubmit = async data => {
        const models = getModels()

        model.name = data.name || Strings["Model.UnnamedModel"]
        
        const index = models.findIndex(m => m.name === model.name)

        // Ask if the user really wants to override the model if it already exists
        if (index !== -1) {
            const shouldOverride = await Dialog.verify({
                content: Strings["Dialogs.Verifications.Override.Content"].replace("{}", model.name)
            })

            if (!shouldOverride) {
                return
            }
        }

        model.makePreset()
        
        if(index !== -1) models[index] = model
        else models.push(model)

        setModels(models)
        emit(new CustomEvent("modelschange"))
        onClose()
    }

    const fields = [
        {
            type: "title",
            value: Strings["Model.SaveModal.Title"]
        },
        {
            type: "string",
            label: Strings["Model.SaveModal.Name"],
            name: "name",
            defaultValue: model.name,
            ref: saveNameInput
        },
        {
            type: "list",
            label: Strings["Model.SaveModal.Saved"],
            items: getModels().map(({name}) => ({
                type: "listItem",
                value: name,
                onClick: () => saveNameInput.current.set(name)
            }))
        },
        {
            type: "submit",
            inline: true,
            value: Strings["Model.SaveModal.Submit"]
        },
        {
            type: "button",
            inline: true,
            value: Strings["Model.SaveModal.Close"],
            onClick: onClose
        }
    ]

    return (
        <Dialog
            fields={fields}
            onSubmit={handleSubmit}
        />
    )
}

export default (context) => {
    const container = document.createElement("div")

    ReactDOM.render(
        <SaveModel
            appContext={context}
            onClose={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}