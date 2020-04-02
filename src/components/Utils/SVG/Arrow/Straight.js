import React, { Component } from "react"

import toDegrees from "src/utils/toDegrees.js"
import { config } from "./Arrow.js"

class Arrow extends Component {
    setPath(mouseEvent) {
        const { from, to } = this.props
        const { tipLength } = config

        if (!to && mouseEvent) {
            to = { x: mouseEvent.clientX - this.props.container.offsetLeft, y: mouseEvent.clientY - this.props.container.offsetTop }
        }

        let path, rotation

        if (from && to) {
            const fromTo = { x: to.x - from.x, y: to.y - from.y }

            const distance = Math.sqrt(fromTo.x ** 2 + fromTo.y ** 2)
            const angle = toDegrees(Math.acos(fromTo.x / distance)) * (fromTo.y <= 0 ? -1 : 1)

            path = `
                M ${from.x} ${from.y} 
                L ${from.x + distance} ${from.y}
                m ${-distance / 2} ${0}
                l ${-tipLength} ${-tipLength} 
                m ${tipLength} ${tipLength} 
                l ${-tipLength} ${tipLength}
            `

            rotation = `rotate(${angle} ${from.x} ${from.y})`
        }

        this.path.setAttribute("d", path)
        this.path.setAttribute("transform", rotation)
    }

    render() {
        return (
            <path
                stroke={config.color}
                strokeWidth={config.strokeWidth}
                fill="none"
                ref={ref => this.path = ref}
            />
        )
    }
}

export default Arrow