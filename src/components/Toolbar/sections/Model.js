import React, { useState, useRef } from "react"

import createSection from "./createSection.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.json"
import downloadJSON from "src/utils/downloadJSON.js"
import importJSON from "src/utils/importJSON.js"

const _getModels = () => JSON.parse(localStorage.getItem("models")) || {}
const _setModels = models => localStorage.setItem("models", JSON.stringify(models))

const Model = ({model, onModelLoad, onModelReset}) => {
    const [showSaveModal, setShowSaveModal] = useState(false)

    const [showOverrideModal, setShowOverrideModal] = useState(false)
    const [overrideModalFor, setOverrideModalFor] = useState("")
    const [OverrideModalReceiver] = useState(new EventTarget())
    
    const [models, setModelsState] = useState(_getModels())

    const saveNameInput = useRef()

    const setModels = models => {
        _setModels(models)
        setModelsState(_getModels())
    }

    const presetModel = () => {
        model.getObjects().map(object => object.isPresetted = true)
    }

    const handleSaveClick = () => {
        setShowSaveModal(true)
    }

    // Add the model under the name given by data to the models in localStorage
    const handleSaveSubmit = async data => {
        const name = data.name || Strings.Model.UnnamedModel
        
        // Ask if the user really wants to override the model if it already exists
        if(models[name]) {
            setShowOverrideModal(true)
            setOverrideModalFor(name)

            // Wait for the answer
            const shouldOverride = await new Promise(resolve => {
                const listener = (event) => {
                    resolve(event.detail.value)
                    OverrideModalReceiver.removeEventListener("answer", listener)
                }
                OverrideModalReceiver.addEventListener("answer", listener)
            })

            setShowOverrideModal(false)
            setOverrideModalFor("")

            if(!shouldOverride) {
                return
            }
        }

        presetModel()
        models[name] = model

        setModels(models)
        
        setShowSaveModal(false)
    }

    // Remove the model with given name from localStorage
    const handleModelRemove = name => {
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

    const handleNewClick = () => {
        onModelReset()
    }

    return (
        <div>
            <button onClick={handleSaveClick} className="item">{Strings.Model.Save}</button>

            <button onClick={handleExportClick} className="item">{Strings.Model.Export}</button>

            <button onClick={handleImportClick} className="item">{Strings.Model.Import}</button>

            <button onClick={handleNewClick} className="item">{Strings.Model.New}</button>

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

            {showOverrideModal && (
                <Dialog
                    fields={[
                        {
                            type: "title",
                            value: Strings.Model.OverrideModal.Title
                        },
                        {
                            type: "textbox",
                            value: Strings.Model.OverrideModal.Content.replace("{}", overrideModalFor)
                        },
                        {
                            type: "button",
                            label: Strings.Model.OverrideModal.Accept,
                            onClick: () => OverrideModalReceiver.dispatchEvent(new CustomEvent("answer", {detail: {value: true}}))
                        },
                        {
                            type: "button",
                            label: Strings.Model.OverrideModal.Decline,
                            onClick: () => OverrideModalReceiver.dispatchEvent(new CustomEvent("answer", {detail: {value: false}}))
                        }
                    ]}
                />
            )}
        </div>
    )
}

export default createSection(Model, {
    title: Strings.Toolbar.Model,
    className: "model"
})