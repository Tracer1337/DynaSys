import React, { useState } from "react"
import { IconButton, Popover, Typography, withStyles } from "@material-ui/core"
import clsx from "clsx"

import "./FloatingTools.scss"

const styles = {
    button: {
        pointerEvents: "all",
        margin: "0 10px",
        transition: "margin 100ms linear"
    },

    selected: {
        margin: "0 30px",
        color: "#f50057"
    },

    label: {
        pointerEvents: "none"
    },

    innerLabel: {
        padding: 10
    }
}

const Button = ({ label, icon, selected, onClick, classes }) => {
    const [labelAnchor, setLabelAnchor] = useState(null)

    const handleLabelShow = (event) => {
        setLabelAnchor(event.currentTarget)
    }

    const handleLabelHide = () => {
        setLabelAnchor(null)
    }

    const labelVisible = !!labelAnchor
    
    return (
        <IconButton
            className={clsx(classes.button, { [classes.selected]: selected })}
            color={selected ? "secondary" : "primary"}
            onClick={onClick}
            label={label}
            onMouseEnter={handleLabelShow}
            onMouseLeave={handleLabelHide}
        >

            <Popover
                className={classes.label}
                classes={{paper: classes.innerLabel}}
                anchorEl={labelAnchor}
                open={labelVisible}
                onClose={handleLabelHide}
                disableRestoreFocus

                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top"
                }}

                transformOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
            >
                <Typography>{label}</Typography>
            </Popover>

            {React.createElement(icon)}
        </IconButton>
    )
}

export default withStyles(styles)(Button)