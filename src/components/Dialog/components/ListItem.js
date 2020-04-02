import React from "react"
import { ListItem as MuiListItem, ListItemSecondaryAction, ListItemText, IconButton, Grid, Tooltip, withStyles } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import VisibilityIcon from "@material-ui/icons/Visibility"

import MaskConverter from "src/components/Utils/MaskConverter/MaskConverter.js"

import Dialog from "../Dialog.js"
import Strings from "src/config/strings.js"

const styles = {
    listItem: {
        padding: "0 0 0 16px"
    }
}

const ListItem = ({ value, onClick, onRemove, masked, previewModel, classes }) => (
    <MuiListItem button={!!onClick} onClick={onClick} className={classes.listItem}>
        <ListItemText>{masked ? <MaskConverter maskedString={value}/> : value}</ListItemText>

        <ListItemSecondaryAction>
            <Grid container>

                {onRemove && (
                    <Grid item>
                        <Tooltip
                            title={Strings["Dialogs.ListItem.Remove"]}
                            placement="left"
                        >
                            <IconButton
                                onClick={onRemove}
                                edge="end"
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

                {previewModel && (
                    <Grid item>
                        <Tooltip 
                            title={Strings["Dialogs.ListItem.Preview"]}
                            placement="right"
                        >
                            <IconButton
                                edge="end"
                                onClick={() => Dialog.previewModel(previewModel)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}

            </Grid>
        </ListItemSecondaryAction>
    </MuiListItem>
)

export default withStyles(styles)(ListItem)