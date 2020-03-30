import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Dialog as MuiDialog, Container, withStyles } from "@material-ui/core"
import clsx from "clsx"

import String from "./components/String.js"
import List from "./components/List.js"
import ListItem from "./components/ListItem.js"
import Textbox from "./components/Textbox.js"
import Title from "./components/Title.js"
import Subtitle from "./components/Subtitle.js"
import Button from "./components/Button.js"
import Setting from "./components/Setting.js"
import Functions from "./components/Functions.js"
import Select from "./components/Select.js"
import Warning from "./components/Warning.js"
import Caption from "./components/Caption.js"

import Verification from "./templates/Verification.js"
import WarningTemplate from "./templates/Warning.js"
import Settings from "./templates/Settings.js"
import SaveModel from "./templates/SaveModel.js"
import LoadModel from "./templates/LoadModel.js"

import "./Dialog.scss"

const styles = theme => ({
    outerDialog: {
        zIndex: theme.zIndex.drawer
    },

    innerDialog: {
        paddingBottom: 6
    },

    field: {
        margin: 10
    },

    inlineField: {
        display: "inline-block",
        margin: 10
    }
})

class Dialog extends Component {
    static verify = Verification
    static warn = WarningTemplate
    static settings = Settings
    static saveModel = SaveModel
    static loadModel = LoadModel

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
    
    getField(field, index, style) {
        field.key = field.key || index
        let element

        switch(field.type) {
            case "string":
                element = <String {...field} value={this.state.fieldState[field.name]} onChange={value => this.handleChange(field.name, value)}/>
                break
            
            case "list":
                element = <List {...field}>{field.items.map((f, i) => this.getField(f, index + i, {margin: 0}))}</List>
                break

            case "listItem":
                element = <ListItem {...field}/>
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
                element = <Button {...field}/>
                break

            case "submit":
                element = <Button {...field} onClick={this.handleSubmit.bind(this)}/>
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
            
            case "caption":
                element = <Caption {...field}/>
                break

            case "element":
                element = React.createElement(field.value)
                break
            
            default:
                element = <p>Element type {field.type} not found</p>
                break
        }

        return (
            <div key={field.key} style={style} className={clsx(
                this.props.classes.field, {
                    [this.props.classes.inlineField]: field.inline
                }
            )}>
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
        const { classes } = this.props
        
        return ReactDOM.createPortal(
            <MuiDialog 
                className={clsx(classes.outerDialog)}
                open={true}
                onKeyDown={this.handleKeyPress.bind(this)}
                maxWidth="md"
                fullWidth
            >
                <Container className={classes.innerDialog}>
                    {this.props.fields.filter(e => e).map((f, i) => this.getField(f, i))}
                </Container>
            </MuiDialog>
        , document.getElementById("root"))
    }
}

export default withStyles(styles)(Dialog)