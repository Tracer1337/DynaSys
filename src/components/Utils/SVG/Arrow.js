import React from "react"

const Arrow = ({ from, to, Label }) => {
    function toDegrees(angle) {
        return angle * (180 / Math.PI)
    }

    const tipLength = 20

    const fromTo = { x: to.x - from.x, y: to.y - from.y }

    const distance = Math.sqrt(fromTo.x ** 2 + fromTo.y ** 2)
    const angle = toDegrees(Math.acos(fromTo.x / distance)) * Math.sign(fromTo.y)

    const path = `M${from.x} ${from.y} L${from.x + distance} ${from.y} l${-tipLength} ${-tipLength} m${tipLength} ${tipLength} l${-tipLength} ${tipLength}`
    const rotation = `rotate(${angle} ${from.x} ${from.y})`

    return (
        <>
            {Label && (
                <Label
                    x={from.x + fromTo.x / 2}
                    y={from.y + fromTo.y / 2}
                />
            )}
            <path
                d={path}
                stroke="black"
                fill="none"
                transform={rotation}
            />
        </>
    )
}

export default Arrow