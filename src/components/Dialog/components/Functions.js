import React from "react"
import { Paper, InputLabel, FormGroup, Chip, withStyles } from "@material-ui/core"

const availableFunctions = ["pi", "e", "phi", "abs(x)", "ceil(x)", "floor(x)", "round(x [, n])", "exp(x)", "log(x [, base])", "log10(x)", "pow(x, y)", "sign(x)", "sqrt(x)", "random(min, max)", "sin(x)", "cos(x)", "tan(x)"]

const styles = {
    chipContainer: {
        padding: 2
    },

    chip: {
        margin: 2
    }
}

const Functions = ({ label, onClick, classes }) => {
    return (
        <FormGroup>
            <InputLabel>{label}</InputLabel>

            <Paper variant="outlined" className={classes.chipContainer}>
                {availableFunctions.map((name, i) => (
                    <Chip 
                        key={i}
                        onClick={() => onClick(name)}
                        label={name}
                        variant="outlined"
                        className={classes.chip}
                    />
                ))}
            </Paper>
        </FormGroup>
    )
}

export default withStyles(styles)(Functions)