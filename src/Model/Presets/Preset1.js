import objects from "../Objects/Objects.js"

const preset1 = model => {
    const state = new objects["State"]({
        name: "Zustand",
        value: "10 + Parameter0",
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
        name: "ZustandSenke",
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
        name: "QuelleZustand",
        id: -5,
        value: "1.5",
        inputs: [source],
        outputs: [state]
    })

    const param = new objects["Parameter"]({
        name: "Parameter0",
        value: "10",
        id: -6,
        x: 500,
        y: 200
    })

    const effect = new objects["Effect"]({
        name: "Effekt",
        id: -7,
        inputs: [param],
        outputs: [state]
    })

    model.add([state, sink, source, roc1, roc2, param, effect])
}

export default preset1