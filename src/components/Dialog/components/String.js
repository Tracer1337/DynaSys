import React, { Component } from "react"
import { TextField } from "@material-ui/core"

class String extends Component {
    append = value => {
        this.handleChange({target: { 
            value: this.props.value + value
        }})
    }

    set = value => {
        this.handleChange({target: {value}})
    }

    handleChange(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        return(
            <TextField
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                label={this.props.label}
                fullWidth
            />
        )
    }
}

export default String