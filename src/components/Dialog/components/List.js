import React from "react"
import { List as MuiList, FormGroup, Paper, InputLabel, withStyles } from "@material-ui/core"

const styles = {
    label: {
        marginBottom: 6
    }
}

function List({ label, children, classes }) {
    return (
        <FormGroup>
            <InputLabel className={classes.label}>{label}</InputLabel>

            <Paper variant="outlined">
                <MuiList>
                    {children}
                </MuiList>
            </Paper>
        </FormGroup>
    )
}

export default withStyles(styles)(List)