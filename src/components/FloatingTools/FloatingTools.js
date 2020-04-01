import React, { useState, useContext, useEffect } from "react"
import { Grid, Paper, withStyles } from "@material-ui/core"
import clsx from "clsx"

import Button from "./Button.js"

import { AppContext } from "src/App.js"
import tools from "../Tools/Tools.js"
import "./FloatingTools.scss"

const styles = {
    container: {
        position: "absolute",
        bottom: 20,
        zIndex: 1,
        cursor: "default",
        borderRadius: 24,
        padding: "0 15px"
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
        <Grid container justify="center">
            <Paper
                className={clsx(classes.container, { [classes.selected]: !!selected })}
                elevation={5}
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
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(Tools)