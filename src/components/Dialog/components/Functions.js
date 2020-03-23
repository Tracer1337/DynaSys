import React from "react"

const availableFunctions = ["pi", "e", "phi", "abs(x)", "ceil(x)", "floor(x)", "round(x [, n])", "exp(x)", "log(x [, base])", "log10(x)", "pow(x, y)", "sign(x)", "sqrt(x)", "random(min, max)", "sin(x)", "cos(x)", "tan(x)"]

const Functions = ({label, onClick}) => {
    return (
        <div className="functions">
            <label>{label}</label>

            <div>
                {availableFunctions.map((name, i) => (
                    <button 
                        key={i}
                        onClick={() => onClick(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Functions