export const getModels = () => {
    return JSON.parse(localStorage.getItem("models")) || {}
}

export const setModels = models => {
    localStorage.setItem("models", JSON.stringify(models))
}

export const saveModel = model => {
    const models = getModels()
    model.makePreset()

    const index = models.findIndex(m => m.name === model.name)

    if (index !== -1) {
        models[index] = model
    } else {
        models.push(model)
    }

    setModels(models)
}

export const removeModel = model => {
    const models = getModels()
    const newModels = []

    for (let savedModel of models) {
        if (savedModel.name !== model.name) {
            newModels.push(savedModel)
        }
    }

    setModels(newModels)
}

export const modelExists = model => {
    return getModels().some(m => m.name === model.name)
}