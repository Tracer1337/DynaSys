import React, { Component } from "react"

import toDegrees from "src/utils/toDegrees.js"

class Arrow extends Component {
    render() {
        const { from, to } = this.props

        const tipLength = 20

        const fromTo = { x: to.x - from.x, y: to.y - from.y }

        const distance = Math.sqrt(fromTo.x ** 2 + fromTo.y ** 2)
        const angle = toDegrees(Math.acos(fromTo.x / distance)) * (fromTo.y <= 0 ? -1 : 1)

        const path = `M${from.x} ${from.y} L${from.x + distance} ${from.y} l${-tipLength} ${-tipLength} m${tipLength} ${tipLength} l${-tipLength} ${tipLength}`
        const rotation = `rotate(${angle} ${from.x} ${from.y})`

        return (
            <path
                d={path}
                stroke="black"
                fill="none"
                transform={rotation}
            />
        )
    }
}

export default Arrow