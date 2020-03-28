import React from "react"

const Warning = ({value, render}) => {
    if(!render) {
        return <></>
    }

    return (
        <div className="warning">
            {value}
        </div>
    )
}

export default Warning