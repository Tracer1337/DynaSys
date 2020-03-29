import React from "react"
import { Divider, withStyles } from "@material-ui/core"
import clsx from "clsx"

const styles = {
    divider: {
        margin: "10px -10px"
    },

    title: {
        opacity: .75
    }
}

const createSection = (Child, config) => {

    const Section = props => (
        <div className={clsx("section", config.className)}>
            <Child {...props}/>

            <Divider
                className={clsx(props.classes.divider)}
            />
        </div>
    )

    return withStyles(styles)(Section)
}

export default createSection