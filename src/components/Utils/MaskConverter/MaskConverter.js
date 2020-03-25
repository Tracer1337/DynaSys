import React from "react"

function MaskConverter({maskedString}) {
    let converted = maskedString

    // Replace empty braces {} with {#000000} -> Display that text black
    converted = converted.replace(/{}/g, "{#000000}")

    // Convert {<color>}<name> into <span style="color: <color>"><name></span>
    converted = converted.replace(/{(#[0-9a-z]{6})}([0-9a-z\u00c4-\u00df]+)/gi, (match, color, name) => {
        return `<span style="color: ${color}">${name}</span>`
    })
    
    return (
        <span dangerouslySetInnerHTML={{__html: converted}}/>
    )
}

export default MaskConverter