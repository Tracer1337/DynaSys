import React, { Component } from "react"
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"

import MaskConverter from "../../Utils/MaskConverter/MaskConverter.js"
import createOutput from "../createOutput.js"
import Strings from "src/config/strings.js"
import "./Summary.scss"

class Summary extends Component {
    render() {
        const objects = this.props.model.getObjects().filter(object => this.props.selectedObjects.includes(object))

        return (
            <Paper variant="outlined">
                <TableContainer>
                    <Table>
                        
                        <TableHead>
                            <TableRow>
                                <TableCell>{Strings["Outputs.Summary.Name"]}</TableCell>
                                <TableCell>{Strings["Outputs.Summary.Value"]}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                objects.map(object => {
                                    const [leftSide, rightSide] = object.getEquation()

                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <MaskConverter maskedString={leftSide}/>
                                            </TableCell>

                                            <TableCell>
                                                <MaskConverter maskedString={rightSide}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default createOutput(Summary, {
    type: "Summary",
    label: Strings["Outputs.Summary.Label"],
    icon: FormatListBulletedIcon
})