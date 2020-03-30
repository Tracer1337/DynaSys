import React, { useState } from "react"
import { FormGroup, Grid, Input, InputLabel, Popover, Typography, withStyles } from "@material-ui/core"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

import SettingsProvider from "src/config/SettingsProvider.js"
import Strings from "src/config/strings.js"

const styles = {
    helpIconWrapper: {
        height: 20
    },
    
    helpIcon: {
        opacity: .54,
        marginRight: 5,
        cursor: "pointer"
    },

    helper: {
        pointerEvents: "none"
    },

    innerHelper: {
        padding: 10
    }
}

const Setting = ({ name, classes }) => {
    const setting = SettingsProvider.settings[name]

    const [value, setValue] = useState(setting.value)
    const [helperAnchor, setHelperAnchor] = useState(null)

    const handleChange = (event) => {
        SettingsProvider.set(name, event.target.value)
        setValue(event.target.value)
    }

    const handleShowHelper = (event) => {
        setHelperAnchor(event.currentTarget)
    }

    const handleHideHelper = () => {
        setHelperAnchor(null)
    }

    let element

    switch(setting.type) {
        case "number":
            element = (
                <Input 
                    type="number"
                    value={value}
                    step={setting.step || 1}
                    onChange={handleChange}
                />
            )
            break

        default:
            element = <div>Setting {name} not found</div>
            break
    }

    const helperVisible = !!helperAnchor

    return (
        <FormGroup>
            <Grid container alignItems="center">
                <Grid item className={classes.helpIconWrapper}>
                    <HelpOutlineIcon 
                        fontSize="small" 
                        className={classes.helpIcon}
                        onMouseEnter={handleShowHelper}
                        onMouseLeave={handleHideHelper}
                    />

                    <Popover
                        className={classes.helper}
                        classes={{paper: classes.innerHelper}}
                        open={helperVisible}
                        anchorEl={helperAnchor}
                        onClose={handleHideHelper}
                        disableRestoreFocus

                        anchorOrigin={{
                            horizontal: "left",
                            vertical: "top"
                        }}

                        transformOrigin={{
                            horizontal: "right",
                            vertical: "bottom"
                        }}
                    >
                        <Typography>{Strings[`Settings.${name}.helperText`]}</Typography>
                    </Popover>
                </Grid>

                <Grid item>
                    <InputLabel>{Strings[`Settings.${name}`]}</InputLabel>
                </Grid>
            </Grid>

            {element}
        </FormGroup>
    )
}

export default withStyles(styles)(Setting)