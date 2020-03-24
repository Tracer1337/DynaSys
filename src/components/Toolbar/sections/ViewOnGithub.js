import React from "react"

import createSection from "./createSection.js"
import image from "src/assets/images/view-on-github.png"

const ViewOnGithub = () => {
    return (
        <a href="https://github.com/Tracer1337/DynaSys" target="_blank">
            <img src={image}/>    
        </a>
    )
}

export default createSection(ViewOnGithub, {
    className: "github"
})