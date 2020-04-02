import React, { Component } from "react"

import { config } from "./Arrow.js"

const arrowedLine = ({ x, y }) => {
    const { tipLength } = config
    return `
        l ${x / 2} ${y / 2}
        l ${-tipLength} ${-tipLength} 
        m ${tipLength} ${tipLength} 
        l ${-tipLength} ${tipLength}
        m ${tipLength} ${-tipLength}
        l ${x / 2} ${y / 2}
    `
}

class Arrow extends Component {
    setPath(mouseEvent) {
        let { from, to } = this.props

        if (!to && mouseEvent) {
            to = { x: mouseEvent.clientX - this.props.container.offsetLeft, y: mouseEvent.clientY - this.props.container.offsetTop }
        }

        let hPath, hRotation, vPath, vRotation

        if (from && to) {
            const fromTo = { x: to.x - from.x, y: to.y - from.y }

            const vPathFrom = from.x + fromTo.x

            hPath = `
                M ${from.x} ${from.y}
                ${arrowedLine({ x: Math.abs(fromTo.x), y: 0 })}
            `
            hRotation = `rotate(${fromTo.x < 0 ? 180 : 0} ${from.x} ${from.y})`

            vPath = `
                M ${vPathFrom} ${from.y}
                ${arrowedLine({ x: Math.abs(fromTo.y), y: 0 })}
            `
            vRotation = `rotate(${fromTo.y < 0 ? -90 : 90} ${vPathFrom} ${from.y})`
        }

        this.hPath.setAttribute("d", hPath)
        this.hPath.setAttribute("transform", hRotation)

        this.vPath.setAttribute("d", vPath)
        this.vPath.setAttribute("transform", vRotation)
    }

    render() {
        return (
            <>
                <path
                    stroke={config.color}
                    strokeWidth={config.strokeWidth}
                    fill="none"
                    ref={ref => this.hPath = ref}
                />
                <path
                    stroke={config.color}
                    strokeWidth={config.strokeWidth}
                    fill="none"
                    ref={ref => this.vPath = ref}
                />
            </>
        )
    }
}

export default Arrow