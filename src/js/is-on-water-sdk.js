onDomReady(() => {
    const playgroundElm = document.querySelector("#isOnWaterPlayground")
    const resultElm = playgroundElm.querySelector("#isOnWaterResult")

    playgroundElm.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(playgroundElm)

        const lat = formData.get('lat')
        const lon = formData.get('lon')

        if (lat.trim().length === 0 || lon.trim().length === 0 || isNaN(lat) || isNaN(lon)) {
            resultElm.innerText = 'Please set valid latitude and longitude values'
            return
        }

        resultElm.innerText = 'Loading...'

        fetch(`https://is-on-water.balbona.me/api/v1/get/${lat}/${lon}`)
            .then(res => res.json())
            .then(result => {
                resultElm.innerText = JSON.stringify(result, null, 2)
            })
            .catch(err => {
                resultElm.innerText = 'Something went wrong: ' + err.message
            })
    })
})

function onDomReady(callback) {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        callback()
    } else {
        document.addEventListener("DOMContentLoaded", callback)
    }
}
