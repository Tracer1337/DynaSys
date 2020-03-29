import React, { Component } from "react"
import { Drawer, withStyles } from "@material-ui/core"
import clsx from "clsx"

import Tools from "./sections/Tools.js"
import Outputs from "./sections/Outputs.js"
import Presets from "./sections/Presets.js"
import Model from "./sections/Model.js"
import Misc from "./sections/Misc.js"

import { AppContext } from "src/App.js"
import { ToolbarWidth } from "src/config/constants.js"
import "./Toolbar.scss"

const padding = 10

const styles = theme => ({
    toolbar: {
        height: "100%"
    },

    innerToolbar: {
        width: ToolbarWidth,
        padding: padding
    },

    toolbarOpen: {
        width: ToolbarWidth + 2 * padding,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    toolbarClose: {
        width: 64,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    spacer: theme.mixins.toolbar,

    sectionWrapper: {
        width: ToolbarWidth
    }
})

class Toolbar extends Component {
    state = {
        open: true
    }

    handleToogleToolbar() {
        this.setState({ open: !this.state.open })
    }

    componentDidMount() {
        this.context.addEventListener("toggletoolbar", this.handleToogleToolbar.bind(this))
    }
    
    render() {
        const { classes } = this.props

        return (
            <AppContext.Consumer>
                {context => {
                    this.context = context

                    return (
                        <Drawer
                            variant="permanent"
                            anchor="left"
                            className={clsx("toolbar", classes.toolbar, {
                                [classes.toolbarOpen]: this.state.open,
                                [classes.toolbarClose]: !this.state.open,
                            })}
                            classes={{
                                paper: clsx(classes.innerToolbar, {
                                    [classes.toolbarOpen]: this.state.open,
                                    [classes.toolbarClose]: !this.state.open,
                                })
                            }}
                        >
                            <div className={classes.spacer}/>

                            <div className={classes.sectionWrapper}>
                                <Tools/>

                                <Outputs/>

                                <Model/>

                                <Presets/>

                                <Misc/>
                            </div>
                        </Drawer>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default withStyles(styles)(Toolbar)