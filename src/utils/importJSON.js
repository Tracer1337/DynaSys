/**
 * Source: https://stackoverflow.com/questions/16215771/how-open-select-file-dialog-via-js/16215950
 */

export default () => new Promise(resolve => {
    var input = document.createElement('input')
    input.type = 'file'
    document.body.appendChild(input)

    input.onchange = e => {
        var file = e.target.files[0]
        var reader = new FileReader()

        reader.onload = readerEvent => {
            var content = readerEvent.target.result
            const object = JSON.parse(content)
            resolve(object)
        }

        reader.readAsText(file, 'UTF-8')
    }

    input.click()
    input.remove()
})