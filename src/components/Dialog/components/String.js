import React, { Component } from "react"
import { TextField } from "@material-ui/core"

class String extends Component {
    insert = insertion => {
        const inputField = this.textField.querySelector("input")
        const { value } = this.props
        let newValue

        if(!isNaN(inputField.selectionStart)) {
            newValue = value.substr(0, inputField.selectionStart) + insertion + value.substr(inputField.selectionEnd, value.length)    
        } else {
            newValue = value + insertion
        }

        this.handleChange({ target: { value: newValue } })
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
                ref={ref => this.textField = ref}
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
                label={this.props.label}
                fullWidth
            />
        )
    }
}

export default String