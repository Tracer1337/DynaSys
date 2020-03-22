import objects from "../Objects/Objects.js"

const preset4 = addObjects => {
    const adFactor = new objects["Parameter"]({
        name: "WerbeFaktor",
        value: "1",
        id: -11,
        x: 100,
        y: 300
    })

    const shFactor = new objects["Parameter"]({
        name: "SchwundFaktor",
        value: "1",
        id: -12,
        x: 600,
        y: 300
    })

    const ueFactor = new objects["Parameter"]({
        name: "UmweltErholungsFaktor",
        value: "1",
        id: -13,
        x: 200,
        y: 700
    })

    const uzFactor = new objects["Parameter"]({
        name: "UmweltZerstörungsFaktor",
        value: "1",
        id: -30,
        x: 600,
        y: 700
    })

    const guests = new objects["State"]({
        name: "Gäste",
        value: "0.05",
        id: -1,
        x: 300,
        y: 100
    })

    const env = new objects["State"]({
        name: "Umwelt",
        value: "1",
        id: -2,
        x: 300,
        y: 500
    })

    const srcGuests = new objects["Source"]({
        x: 50,
        y: 100,
        id: -3
    })

    const rocGuests1 = new objects["RateOfChange"]({
        name: "GästeZuwachs",
        id: -4,
        value: "WerbeFaktor * Umwelt",
        inputs: [srcGuests],
        outputs: [guests]
    })

    srcGuests.outputs = [rocGuests1]

    const sinkGuests = new objects["Sink"]({
        x: 700,
        y: 100,
        id: -5
    })

    const rocGuests2 = new objects["RateOfChange"]({
        name: "GästeAbnahme",
        id: -6,
        value: "SchwundFaktor * Gäste",
        inputs: [guests],
        outputs: [sinkGuests]
    })

    sinkGuests.inputs = [rocGuests2]

    const srcEnv = new objects["Source"]({
        x: 50,
        y: 500,
        id: -7
    })

    const rocEnv1 = new objects["RateOfChange"]({
        name: "Verbesserung",
        id: -8,
        value: "UmweltErholungsFaktor * Umwelt * (1 - Umwelt)",
        inputs: [srcEnv],
        outputs: [env]
    })
    
    srcEnv.outputs = [rocEnv1]

    const sinkEnv = new objects["Sink"]({
        x: 700,
        y: 500,
        id: -9
    })

    const rocEnv2 = new objects["RateOfChange"]({
        name: "Zerstörung",
        id: -10,
        value: "UmweltZerstörungsFaktor * Gäste * Umwelt",
        inputs: [env],
        outputs: [sinkEnv]
    })

    sinkEnv.inputs = [rocEnv2]

    const effect1 = new objects["Effect"]({
        name: "Effekt",
        id: -14,
        inputs: [adFactor],
        outputs: [rocGuests1]
    })

    const effect2 = new objects["Effect"]({
        name: "Effekt",
        id: -15,
        inputs: [shFactor],
        outputs: [rocGuests2]
    })

    const effect3 = new objects["Effect"]({
        name: "Effekt",
        id: -16,
        inputs: [ueFactor],
        outputs: [rocEnv1]
    })

    const effect4 = new objects["Effect"]({
        name: "Effekt",
        id: -17,
        inputs: [uzFactor],
        outputs: [rocEnv2]
    })

    const effect5 = new objects["Effect"]({
        name: "Effekt",
        id: -18,
        inputs: [guests],
        outputs: [rocEnv2]
    })

    const effect6 = new objects["Effect"]({
        name: "Effekt",
        id: -19,
        inputs: [env],
        outputs: [rocEnv2]
    })

    const effect7 = new objects["Effect"]({
        name: "Effekt",
        id: -20,
        inputs: [env],
        outputs: [rocEnv1]
    })

    const effect8 = new objects["Effect"]({
        name: "Effekt",
        id: -21,
        inputs: [env],
        outputs: [rocGuests1]
    })

    const effect9 = new objects["Effect"]({
        name: "Effekt",
        id: -22,
        inputs: [guests],
        outputs: [rocGuests2]
    })


    const first = [adFactor, shFactor, ueFactor, uzFactor, guests, env, srcGuests, sinkGuests, srcEnv, sinkEnv]
    const second = [rocGuests1, rocGuests2, rocEnv1, rocEnv2]
    const third = [effect1, effect2, effect3, effect4, effect5, effect6, effect7, effect8, effect9]
    
    const push = objects => {
        objects.forEach(object => object.isPresetted = true)
        addObjects(objects)
    }

    push(first)
    push(second)
    push(third)
}

export default preset4