import objects from "../Objects/Objects.js"

const preset2 = model => {
    const state = new objects["State"]({
        name: "Zustand",
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
        name: "Änderung",
        id: -3,
        value: "Zustand / 4 - Zustand0",
        inputs: [state],
        outputs: [sink]
    })

    const state2 = new objects["State"]({
        name: "Zustand0",
        value: "1",
        id: -4,
        x: 500,
        y: 300
    })

    const effect = new objects["Effect"]({
        id: -5,
        inputs: [state2],
        outputs: [roc]
    })

    model.add([state, sink, roc, state2, effect])
}

export default preset2