import React from "react"

const createSection = (Child, config) => {

    const Section = props => (
        <div className={`section ${config.className || ""}`}>
            <p>{config.title}</p>
            
            <Child {...props}/>
        </div>
    )

    return Section
}

export default createSection