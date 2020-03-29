import React from "react"
import { Button as MuiButton, withStyles } from "@material-ui/core"

const styles = {
    button: {
        paddingLeft: 0
    }
}

function Button({ onClick, value, classes, color}) {
    return (
        <MuiButton 
            onClick={onClick}
            color={color || "primary"}
            className={classes.button}
        >
            {value}
        </MuiButton>
    )
}

export default withStyles(styles)(Button)