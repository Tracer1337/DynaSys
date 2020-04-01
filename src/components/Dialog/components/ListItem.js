import React from "react"
import { ListItem as MuiListItem, ListItemSecondaryAction, ListItemText, IconButton, withStyles } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

import MaskConverter from "src/components/Utils/MaskConverter/MaskConverter.js"

const styles = {
    listItem: {
        padding: "0 0 0 16px"
    }
}

const ListItem = ({ value, onClick, onRemove, masked, classes }) => (
    <MuiListItem button={!!onClick} onClick={onClick} className={classes.listItem}>
        <ListItemText>{masked ? <MaskConverter maskedString={value}/> : value}</ListItemText>
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