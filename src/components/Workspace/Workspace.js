import React, { Component } from "react"
import { Paper, withStyles } from "@material-ui/core"
import clsx from "clsx"

import ToolSpace from "./ToolSpace/ToolSpace.js"
import ConnectorSpace from "./ConnectorSpace/ConnectorSpace.js"
import "./Workspace.scss"

const styles = {
    container: {
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) inset"
    }
}

class Workspace extends Component {
    AcrossSpaceCommunication = {
        set: (key, newValues) => {
            this.AcrossSpaceCommunication = {
                ...this.AcrossSpaceCommunication,
                [key]: {
                    ...this.AcrossSpaceCommunication[key],
                    ...newValues
                }
            }

            this.forceUpdate()
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Paper
                className={clsx("workspace", classes.container)}
                ref={ref => this.container = ref}
                square
            >
                <ToolSpace acrossSpaceCommunication={this.AcrossSpaceCommunication} />

                <ConnectorSpace acrossSpaceCommunication={this.AcrossSpaceCommunication} container={this.container} />
            </Paper>
        )
    }
}

export default withStyles(styles)(Workspace)