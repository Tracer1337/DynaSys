import React, { Component } from "react"
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@material-ui/core"
import TableChartIcon from "@material-ui/icons/TableChart"

import createOutput from "../createOutput.js"
import Strings from "src/config/strings.js"
import outputs from "src/Model/Outputs/Outputs.js"
import fix from "src/utils/fix.js"
import "./TimeTable.scss"

class TimeTable extends Component {
    render() {
        const object = new outputs["TimeTable"]({ objects: this.props.selectedObjects, model: this.props.model })

        const data = object.generateData()

        // Change data = {id: [values, ...], ...} to formatted = [{id: value, ...}, ...]
        const formatted = []
        for(let i = 0; i <= object.timesteps / object.dt; i++) {
            formatted[i] = {}
            for(let id in data) {
                formatted[i][id] = data[id][i]
            }
        }

        return (
            <Paper variant="outlined">
                <TableContainer>
                    <Table>
                        
                        <TableHead>
                            <TableRow>
                                <TableCell>{Strings["Outputs.TimeTable.Time"]}</TableCell>
                                {
                                    Object.keys(data).map(id =>
                                        <TableCell key={id}>{this.props.model.getObjectById(id).name}</TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                formatted.map((row, t) =>
                                    <TableRow hover key={t}>
                                        <TableCell>{fix(t * object.dt)}</TableCell>
                                        {
                                            Object.values(row).map((value, i) =>
                                                <TableCell key={i}>{value}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default createOutput(TimeTable, {
    type: "TimeTable",
    label: Strings["Outputs.TimeTable.Label"],
    icon: TableChartIcon
})