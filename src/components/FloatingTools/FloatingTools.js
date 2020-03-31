import React, { useState, useContext, useEffect } from "react"
import { Fab, IconButton, withStyles } from "@material-ui/core"
import clsx from "clsx"

import Button from "./Button.js"

import { AppContext } from "src/App.js"
import tools from "../Tools/Tools.js"
import "./FloatingTools.scss"

const styles = {
    fab: {
        position: "absolute",
        bottom: 20,
        left: "50%",
        zIndex: 1,
        pointerEvents: "none",
        cursor: "default"
    }
}

const Tools = ({ classes }) => {
    const [selected, setSelected] = useState(null)
    const { onActiveToolChange, activeTool } = useContext(AppContext)

    const handleClick = type => {
        const newSelected = selected === type ? null : type
        setSelected(newSelected)

        onActiveToolChange(newSelected)
    }

    useEffect(() => {
        if (activeTool !== selected) {
            setSelected(activeTool)
        }
    }, [activeTool, selected])

    return (
        <Fab
            className={clsx("fab", classes.fab)}
            variant="extended"
            color="secondary"
            disableRipple
        >
            {Object.entries(tools).map(([type, tool], i) => !tool.config.hideInToolbar && (
                <Button
                    key={i}
                    label={tool.config.label}
                    icon={tool.config.icon}
                    selected={selected === type}
                    onClick={() => handleClick(type)}
                />
            ))}
        </Fab>
    )
}

export default withStyles(styles)(Tools)