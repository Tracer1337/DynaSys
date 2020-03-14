import React, { Component } from "react"
import ReactDOM from "react-dom"

import String from "./components/String.js"
import List from "./components/List.js"
import Textbox from "./components/Textbox.js"
import Title from "./components/Title.js"
import Submit from "./components/Submit.js"

import "./Dialog.scss"

class Dialog extends Component {
    constructor(props) {
        super(props)

        this.idCounter = 0

        this.fieldState = {}

        for(let field in this.props.fields) {
            if(field.name) {
                this.fieldState[field.name] = field.defaultValue || null
            }
        }
    }
    
    getField(field) {
        let element

        switch(field.type) {
            case "string":
                element = <String {...field} onChange={value => this.handleChange(field.name, value)}/>
                break
            
            case "list":
                element = <List {...field}>{field.items.map(f => this.getField(f))}</List>
                break
            
            case "textbox":
                element = <Textbox {...field}/>
                break

            case "title":
                element = <Title {...field}/>
                break

            case "submit":
                element = <Submit {...field} onClick={this.handleSubmit.bind(this)}/>
                break
            
            default:
                element = <p>Element type {field.type} not found</p>
                break
        }

        return (
            <div className="field" key={this.idCounter++}>
                {element}
            </div>
        )
    }

    handleChange(name, value) {
        this.fieldState[name] = value
    }

    handleSubmit() {
        if(this.props.onSubmit) {
            this.props.onSubmit(this.fieldState)
        }
    }

    handleKeyPress(event) {
        // User pressed enter => Submit
        if(event.keyCode === 13 && this.props.onSubmit) {
            this.props.onSubmit(this.fieldState)
        }
    }

    render() {
        return ReactDOM.createPortal(
            <div className="outer-dialog">
                <div 
                    className="inner-dialog"
                    onKeyDown={this.handleKeyPress.bind(this)}
                >
                    {this.props.fields.map(f => this.getField(f))}
                </div>
            </div>
        , document.getElementById("root"))
    }
}

export default Dialog