import React from "react"
import { DialogTitle, Divider, withStyles } from "@material-ui/core"

const styles = {
    title: {
        textAlign: "center",
        padding: "12px"
    },

    divider: {
        margin: "0 -34px"
    }
}

function Title({value, classes}) {
    return (
        <>
            <DialogTitle className={classes.title}>
                {value}
            </DialogTitle>

            <Divider className={classes.divider}/>
        </>
    )
}

export default withStyles(styles)(Title)