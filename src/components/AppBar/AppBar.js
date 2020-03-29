import React, { useContext } from "react"
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography, withStyles } from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

import { AppContext } from "src/App.js"
import "./AppBar.scss"

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
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
                    className="menu-icon"
                    onClick={handleMenuClick}
                >
                    <MenuIcon/>
                </IconButton>

                <Typography variant="h6" className="title">
                    {context.model.name}
                </Typography>
            </Toolbar>
        </MaterialAppBar>
    )
}

export default withStyles(styles)(AppBar)