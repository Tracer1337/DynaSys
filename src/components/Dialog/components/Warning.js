import React from "react"
import { Alert } from "@material-ui/lab"

const Warning = ({value}) => {
    return (
        <Alert severity="warning">{value}</Alert>
    )
}

export default Warning