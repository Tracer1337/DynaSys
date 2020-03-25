import React, { useState, useRef } from "react"

import createSection from "./createSection.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
import downloadJSON from "src/utils/downloadJSON.js"
import importJSON from "src/utils/importJSON.js"

const _getModels = () => JSON.parse(localStorage.getItem("models")) || {}
const _setModels = models => localStorage.setItem("models", JSON.stringify(models))

const Model = ({model, onModelLoad}) => {
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [models, setModelsState] = useState(_getModels())
    const saveNameInput = useRef()

    const setModels = models => {
        _setModels(models)
        setModelsState(models)
    }

    const presetModel = () => {
        model.getObjects().map(object => object.isPresetted = true)
    }

    const handleSaveClick = () => {
        setShowSaveModal(true)
    }

    const handleSaveSubmit = data => {
        // Add the model under the name given by data to the models in localStorage
        presetModel()
        models[data.name] = model

        setModels(models)
        
        setShowSaveModal(false)
    }

    const handleModelRemove = name => {
        // Remove the model with given name from localStorage
        const newModels = {}

        for(let key in models) {
            if(key !== name) {
                newModels[key] = models[key]
            }
        }
        
        setModels(newModels)
    }

    const handleExportClick = () => {
        presetModel()
        downloadJSON(model, "model")
    }

    const handleImportClick = async () => {
        const newModel = await importJSON()
        onModelLoad(newModel)
    }

    return (
        <div>
            <button onClick={handleSaveClick} className="item">{Strings.Model.Save}</button>

            <button onClick={handleExportClick} className="item">{Strings.Model.Export}</button>

            <button onClick={handleImportClick} className="item">{Strings.Model.Import}</button>

            {Object.entries(models).map(([name, json], i) => (
                <div className="item">
                    <button onClick={() => onModelLoad(json)} key={i+"-Load"}>
                        {name}
                    </button>

                    <button onClick={() => handleModelRemove(name)} key={i+"-Remove"}>X</button>
                </div>
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
                            name: "name",
                            ref: saveNameInput
                        },
                        {
                            type: "list",
                            label: Strings.Model.SaveModal.Saved,
                            items: Object.keys(models).map(name => ({
                                type: "button",
                                label: name,
                                onClick: () => saveNameInput.current.set(name)
                            }))
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