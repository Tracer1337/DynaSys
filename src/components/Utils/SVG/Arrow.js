import React, { Component } from "react"

import toDegrees from "src/utils/toDegrees.js"

const tipLength = 20

class Arrow extends Component {
    constructor(props) {
        super(props)

        this.setPath = this.setPath.bind(this)
    }

    setPath(mouseEvent) {
        let {from, to} = this.props

        if(!to && mouseEvent) {
            to = { x: mouseEvent.clientX - this.props.container.offsetLeft, y: mouseEvent.clientY - this.props.container.offsetTop }
        }

        let path, rotation

        if(from && to) {
            const fromTo = { x: to.x - from.x, y: to.y - from.y }

            const distance = Math.sqrt(fromTo.x ** 2 + fromTo.y ** 2)
            const angle = toDegrees(Math.acos(fromTo.x / distance)) * (fromTo.y <= 0 ? -1 : 1)

            path = `M${from.x} ${from.y} L${from.x + distance} ${from.y} l${-tipLength} ${-tipLength} m${tipLength} ${tipLength} l${-tipLength} ${tipLength}`
            rotation = `rotate(${angle} ${from.x} ${from.y})`
        }

        this.pathRef.setAttribute("d", path)
        this.pathRef.setAttribute("transform", rotation)
    }

    handleMouseMove(event) {
        this.setPath(event)
    }

    componentDidUpdate() {
        this.setPath()
    }

    componentDidMount() {
        if(!this.props.to) {
            window.addEventListener("mousemove", this.setPath)
        } else {
            this.setPath()
        }
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.setPath)
    }

    render() {
        return (
            <path
                stroke="black"
                fill="none"
                ref={ref => this.pathRef = ref}
            />
        )
    }
}

export default Arrow