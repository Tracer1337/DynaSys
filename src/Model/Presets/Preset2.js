import objects from "../Objects/Objects.js"
import Model from "../Model.js"

const preset2 = model => {
    const state = new objects["State"]({
        name: "Zustand1",
        value: "128",
        id: -1,
        x: 100,
        y: 200
    })

    const sink = new objects["Sink"]({
        x: 300,
        y: 500,
        id: -2
    })

    const roc = new objects["RateOfChange"]({
        name: "Änderung1",
        id: -3,
        value: "Zustand1 / 4",
        inputs: [state],
        outputs: [sink]
    })

    model.add([state, sink, roc])
}

export default preset2