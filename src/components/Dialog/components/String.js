import React, { useState } from "react"

function String({label, onChange, defaultValue}) {
    const [value, setValue] = useState(defaultValue || "")

    const handleChange = event => {
        setValue(event.target.value)
        onChange(event.target.value)
    }

    return (
        <div className="string">
            <label>{label}</label>
            <input 
                type="string"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default String