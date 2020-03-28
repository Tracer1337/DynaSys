import React, { Component } from "react"
import ReactDOM from "react-dom"

import String from "./components/String.js"
import List from "./components/List.js"
import Textbox from "./components/Textbox.js"
import Title from "./components/Title.js"
import Subtitle from "./components/Subtitle.js"
import Submit from "./components/Submit.js"
import Setting from "./components/Setting.js"
import Functions from "./components/Functions.js"
import Select from "./components/Select.js"
import Warning from "./components/Warning.js"

import Verification from "./templates/Verification.js"
import WarningTemplate from "./templates/Warning.js"
import Settings from "./templates/Settings.js"

import "./Dialog.scss"

class Dialog extends Component {
    static verify = Verification
    static warn = WarningTemplate
    static settings = Settings

    constructor(props) {
        super(props)
        
        this.state = {
            fieldState: {}
        }

        for(let field of this.props.fields.filter(e => e)) {
            if(field.name) {
                this.state.fieldState[field.name] = field.defaultValue === undefined ? null : field.defaultValue
            }
        }
    }
    
    getField(field, index) {
        field.key = field.key || index
        let element

        switch(field.type) {
            case "string":
                element = <String {...field} value={this.state.fieldState[field.name]} onChange={value => this.handleChange(field.name, value)}/>
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

            case "subtitle":
                element = <Subtitle {...field}/>
                break

            case "button":
                element = <button onClick={field.onClick}>{field.label}</button>
                break

            case "submit":
                element = <Submit {...field} onClick={this.handleSubmit.bind(this)}/>
                break

            case "setting":
                element = <Setting {...field}/>
                break

            case "functions":
                element = <Functions {...field}/>
                break

            case "select":
                element = <Select {...field} value={this.state.fieldState[field.name]} onChange={value => this.handleChange(field.name, value)}/>
                break

            case "warning":
                element = <Warning {...field}/>
                break
            
            default:
                element = <p>Element type {field.type} not found</p>
                break
        }

        return (
            <div className="field" key={field.key}>
                {element}
            </div>
        )
    }

    handleChange(name, value) {
        this.setState({
            fieldState: {
                ...this.state.fieldState,
                [name]: value
            }
        })
    }

    handleSubmit() {
        if(this.props.onSubmit) {
            this.props.onSubmit(this.state.fieldState)
        }
    }

    handleKeyPress(event) {
        // User pressed enter => Submit
        if(event.keyCode === 13 && this.props.onSubmit) {
            this.props.onSubmit(this.state.fieldState)
        }
    }

    render() {
        return ReactDOM.createPortal(
            <div className="outer-dialog">
                <div 
                    className="inner-dialog"
                    onKeyDown={this.handleKeyPress.bind(this)}
                >
                    {this.props.fields.filter(e => e).map((f, i) => this.getField(f, i))}
                </div>
            </div>
        , document.getElementById("root"))
    }
}

export default Dialog