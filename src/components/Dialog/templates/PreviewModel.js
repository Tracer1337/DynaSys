import React from "react"
import ReactDOM from "react-dom"
import { Paper, withStyles } from "@material-ui/core"

import Workspace from "src/components/Workspace/Workspace.js"

import Model from "src/Model/Model.js"
import { AppContext, appContextInitialValue } from "src/App.js"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"

const styles = {
    previewContainer: {
        width: 1620,
        height: 905,
        zoom: .55
    }
}

export default (rawModel) => {
    const container = document.createElement("div")
    const model = Model.loadObject(rawModel)

    const Preview = ({ classes }) => (
        <Paper className={classes.previewContainer}>
            <AppContext.Provider value={{
                ...appContextInitialValue,
                model
            }}>
                <Workspace />
            </AppContext.Provider>
        </Paper>
    )

    ReactDOM.render(
        <Dialog
            fields={[{
                type: "title",
                value: model.name
            }, {
                type: "element",
                value: withStyles(styles)(Preview)
            }, {
                type: "submit",
                value: Strings["Dialogs.Close"]
            }]}
            onSubmit={() => ReactDOM.unmountComponentAtNode(container)}
        />
    , container)
}