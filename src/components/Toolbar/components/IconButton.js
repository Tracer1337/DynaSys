import React from "react"
import { IconButton as MaterialIconButton, Button, Grid, withStyles } from "@material-ui/core"

const styles = {
    textButtonWrapper: {
        flexGrow: 1
    },

    textButton: {
        width: "100%",
        justifyContent: "left"
    }
}

const IconButton = ({ classes, icon, label, color, customLabel, onClick }) => (
    <Grid
        container
        spacing={1}
        alignItems="center"
    >

        <Grid item>
            <MaterialIconButton
                onClick={onClick}
                color={color}
            >
                {React.createElement(icon, { fontSize: "small" })}
            </MaterialIconButton>
        </Grid>

        <Grid item className={classes.textButtonWrapper}>
            {customLabel ? React.createElement(customLabel) : (
                <Button
                    onClick={event => {
                        event.currentTarget.blur()
                        onClick(event)
                    }}
                    color={color}
                    className={classes.textButton}
                >
                    {label}
                </Button>
            )}
        </Grid>

    </Grid>
)

export default withStyles(styles)(IconButton)