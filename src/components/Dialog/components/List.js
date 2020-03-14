import React from "react"

function List({label, children}) {
    return (
        <div className="list">
            <label>{label}</label>
            <ul>
                {children.map((child, i) => (
                    <li key={i}>
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List