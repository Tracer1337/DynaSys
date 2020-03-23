import React, { useState } from "react"

import createSection from "./createSection.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
import downloadJSON from "src/utils/downloadJSON.js"
import importJSON from "src/utils/importJSON.js"

const Model = ({model, onModelLoad}) => {
    const [showSaveModal, setShowSaveModal] = useState(false)

    const handleSaveClick = () => {
        setShowSaveModal(true)
    }

    const handleSaveSubmit = data => {
        // Add the model under the name given by data to the models in localStorage

        const currentModels = JSON.parse(localStorage.getItem("models")) || {}

        model.getObjects().map(object => object.isPresetted = true)
        currentModels[data.name] = model

        localStorage.setItem("models", JSON.stringify(currentModels))
        
        setShowSaveModal(false)
    }

    const handleExportClick = () => {
        downloadJSON(model, "model")
    }

    const handleImportClick = async () => {
        const newModel = await importJSON()
        onModelLoad(newModel)
    }

    const savedModels = JSON.parse(localStorage.getItem("models")) || {}

    return (
        <div>
            <button onClick={handleSaveClick} className="item">{Strings.Model.Save}</button>

            <button onClick={handleExportClick} className="item">{Strings.Model.Export}</button>

            <button onClick={handleImportClick} className="item">{Strings.Model.Import}</button>

            {Object.entries(savedModels).map(([name, json], i) => (
                <button className="item" onClick={() => onModelLoad(json)} key={i}>
                    {name}
                </button>
            ))}

            {showSaveModal && (
                <Dialog
                    fields={[
                        {
                            type: "title",
                            value: Strings.Model.SaveModal.Title
                        },
                        {
                            type: "string",
                            label: Strings.Model.SaveModal.Name,
                            name: "name"
                        },
                        {
                            type: "submit",
                            value: Strings.Model.SaveModal.Submit
                        },
                        {
                            type: "button",
                            label: Strings.Model.SaveModal.Close,
                            onClick: () => setShowSaveModal(false)
                        }
                    ]}
                    onSubmit={handleSaveSubmit}
                />
            )}
        </div>
    )
}

export default createSection(Model, {
    title: Strings.Toolbar.Model,
    className: "model"
})