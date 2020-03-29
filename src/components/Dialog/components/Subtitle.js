import React from "react"
import { Typography, withStyles } from "@material-ui/core"

const styles = {
    subtitle: {
        opacity: .9,
        margin: "15px 0 15px 15px"
    }
}

function Subtitle({ value, classes }) {
    return (
        <Typography variant="h6" className={classes.subtitle}>
            {value}
        </Typography>
    )
}

export default withStyles(styles)(Subtitle)