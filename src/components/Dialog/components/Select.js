import React from "react"

function Select({ label, options, onChange, value }) {
    const handleChange = event => {
        onChange(event.target.value)
    }

    return (
        <div className="select">
            <label>{label}</label>

            <select value={value} onChange={handleChange}>
                {options.map(({value, label, style}, i) => (
                    <option value={value} key={i} style={style}>{label}</option>
                ))}
            </select>
        </div>
    )
}

export default Select