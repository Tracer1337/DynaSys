export const getModels = () => JSON.parse(localStorage.getItem("models")) || {}
export const setModels = models => localStorage.setItem("models", JSON.stringify(models))
