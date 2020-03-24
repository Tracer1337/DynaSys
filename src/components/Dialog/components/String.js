import React, { Component } from "react"

class String extends Component {
    append = value => {
        this.handleChange({target: { 
            value: this.props.value + value
        }})
    }

    handleChange(event) {
        this.props.onChange(event.target.value)
    }

    render() {
        return(
            <div className="string">
                <label>{this.props.label}</label>
                <input
                    type="string"
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default String