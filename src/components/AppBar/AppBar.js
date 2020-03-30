import React, { useContext } from "react"
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography, withStyles } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

import { AppContext } from "src/App.js"
const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },

    menuIcon: {
        color: "white",
        marginRight: 15
    },

    modelName: {
        flexGrow: 1
    },

    toolbar: {
        paddingLeft: 8
    }
})

const AppBar = ({ classes }) => {
    const context = useContext(AppContext)

    const handleMenuClick = () => {
        context.emit(new CustomEvent("toggletoolbar"))
    }

    return (
        <MaterialAppBar
            position="fixed"
            className={`app-bar ${classes.appBar}`}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    className={classes.menuIcon}
                    onClick={handleMenuClick}
                >
                    <MenuIcon/>
                </IconButton>

                <Typography variant="h6" className={classes.modelName}>
                    {context.model.name}
                </Typography>
            </Toolbar>
        </MaterialAppBar>
    )
}

export default withStyles(styles)(AppBar)