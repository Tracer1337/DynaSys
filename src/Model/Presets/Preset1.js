import objects from "../Objects/Objects.js"

const preset1 = model => {
    const state = new objects["State"]({
        name: "Zustand1",
        value: "10",
        id: -1,
        x: 100,
        y: 200
    })

    const sink = new objects["Sink"]({
        x: 300,
        y: 500,
        id: -2
    })

    const roc1 = new objects["RateOfChange"]({
        name: "Änderung1",
        id: -3,
        value: "1",
        inputs: [state],
        outputs: [sink]
    })

    const source = new objects["Source"]({
        x: 50,
        y: 50,
        id: -4
    })

    const roc2 = new objects["RateOfChange"]({
        name: "Änderung2",
        id: -5,
        value: "1.5",
        inputs: [source],
        outputs: [state]
    })

    model.add([state, sink, source, roc1, roc2])
}

export default preset1