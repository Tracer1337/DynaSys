import objects from "../Objects/Objects.js"

const preset3 = model => {
    const state = new objects["State"]({
        name: "Bevölkerung",
        value: "0",
        id: -1,
        x: 100,
        y: 200
    })

    const source = new objects["Source"]({
        x: 100,
        y: 100,
        id: -2
    })

    const roc = new objects["RateOfChange"]({
        name: "Bevölkerungswachstum",
        id: -3,
        value: "10000",
        inputs: [source],
        outputs: [state]
    })

    const state2 = new objects["State"]({
        name: "Geburten",
        value: "Bevölkerung * 2",
        id: -4,
        x: 100,
        y: 300
    })

    const effect = new objects["Effect"]({
        id: -5,
        inputs: [state],
        outputs: [state2]
    })

    const newObjects = [state, source, roc, state2, effect]

    newObjects.forEach(object => object.isPresetted = true)

    model.add(newObjects)
}

export default preset3