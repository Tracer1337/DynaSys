import React from "react"

function Submit({onClick, value}) {
    return (
        <button onClick={onClick}>
            {value}
        </button>
    )
}

export default Submit