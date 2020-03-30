import React from "react"
import { ListItem as MuiListItem, ListItemSecondaryAction, ListItemText, IconButton, withStyles } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const styles = {
    listItem: {
        padding: "0 0 0 16px"
    }
}

const ListItem = ({ value, onClick, onRemove, classes }) => (
    <MuiListItem button={!!onClick} onClick={onClick} className={classes.listItem}>
        <ListItemText>{value}</ListItemText>
        {onRemove && (
            <ListItemSecondaryAction>
                <IconButton
                    onClick={onRemove}
                    edge="end"
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        )}
    </MuiListItem>
)

export default withStyles(styles)(ListItem)