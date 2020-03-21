import React, { Component } from "react"

class String extends Component {
    state = {value: this.props.defaultValue || ""}

    append = value => {
        this.handleChange({target: { 
            value: this.state.value + value
        }})
    }

    handleChange(event) {
        this.setState({value: event.target.value})
        this.props.onChange(event.target.value)
    }

    render() {
        return(
            <div className="string">
                <label>{this.props.label}</label>
                <input
                    type="string"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default String