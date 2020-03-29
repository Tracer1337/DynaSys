import { useState } from "react"

let idCounter = 0

const useId = () => {
    const [id] = useState((idCounter++).toString())
    return id
}

export default useId