import React from "react"
import { ListItem as MuiListItem, ListItemText, withStyles } from "@material-ui/core"

const styles = {
    listItem: {
        padding: "0 0 0 16px"
    }
}

const ListItem = ({ value, onClick, classes }) => (
    <MuiListItem button={!!onClick} onClick={onClick} className={classes.listItem}>
        <ListItemText>{value}</ListItemText>
    </MuiListItem>
)

export default withStyles(styles)(ListItem)