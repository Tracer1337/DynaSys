import React, { useContext } from "react"
import SaveIcon from "@material-ui/icons/Save"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser"
import AddIcon from "@material-ui/icons/Add"
import CachedIcon from "@material-ui/icons/Cached"

import IconButton from "../components/IconButton.js"

import { AppContext } from "src/App.js"
import createSection from "./createSection.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.js"
import downloadJSON from "src/utils/downloadJSON.js"
import importJSON from "src/utils/importJSON.js"

const Model = () => {
    const context = useContext(AppContext)
    const { model, onModelLoad, onModelReset } = context

    const handleSaveClick = () => {
        Dialog.saveModel(context)
    }

    const handleLoadClick = () => {
        Dialog.loadModel(context)
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
                onClick={handleLoadClick}
                icon={CachedIcon}
                label={Strings["Model.Load"]}
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
        </div>
    )
}

export default createSection(Model, {
    className: "model"
})