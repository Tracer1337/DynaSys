import React, { useState, useRef, useContext } from "react"
import SaveIcon from "@material-ui/icons/Save"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser"
import AddIcon from "@material-ui/icons/Add"

import IconButton from "../components/IconButton.js"

import { AppContext } from "src/App.js"
import createSection from "./createSection.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.js"
import downloadJSON from "src/utils/downloadJSON.js"
import importJSON from "src/utils/importJSON.js"
import { getModels, setModels } from "src/utils/models.js"

const Model = () => {
    const [showSaveModal, setShowSaveModal] = useState(false)
    const { model, onModelLoad, onModelReset, emit } = useContext(AppContext)

    const saveNameInput = useRef()

    const handleSaveClick = () => {
        setShowSaveModal(true)
    }

    // Add the model under the name given by data to the models in localStorage
    const handleSaveSubmit = async data => {
        const models = getModels()
        
        const name = data.name || Strings["Model.UnnamedModel"]
        model.name = name

        // Ask if the user really wants to override the model if it already exists
        if(models[name]) {
            const shouldOverride = await Dialog.verify({
                content: Strings["Dialogs.Verifications.Override.Content"].replace("{}", name)
            })

            if(!shouldOverride) {
                return
            }
        }

        model.makePreset()
        models[name] = model

        setModels(models)
        emit(new CustomEvent("modelschange"))
        
        setShowSaveModal(false)
    }

    const handleExportClick = () => {
        model.makePreset()
        downloadJSON(model, model.name)
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
            <IconButton
                onClick={handleSaveClick}
                icon={SaveIcon}
                label={Strings["Model.Save"]}
            />

            <IconButton
                onClick={handleExportClick}
                icon={SaveAltIcon}
                label={Strings["Model.Export"]}
            />

            <IconButton
                onClick={handleImportClick}
                icon={OpenInBrowserIcon}
                label={Strings["Model.Import"]}
            />

            <IconButton
                onClick={handleNewClick}
                icon={AddIcon}
                label={Strings["Model.New"]}
            />

            {showSaveModal && (
                <Dialog
                    fields={[
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
                            items: Object.keys(getModels()).map(name => ({
                                type: "button",
                                value: name,
                                onClick: () => saveNameInput.current.set(name)
                            }))
                        },
                        {
                            type: "submit",
                            value: Strings["Model.SaveModal.Submit"]
                        },
                        {
                            type: "button",
                            value: Strings["Model.SaveModal.Close"],
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
    className: "model"
})