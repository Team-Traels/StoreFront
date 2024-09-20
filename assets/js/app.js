let basket = []


function saveLocalData() {
    let saveableData = JSON.stringify(basket)
    localStorage.setItem('data', saveableData)
}

const logo = document.getElementById('logo')
let mainPageLoaded = true

logo.addEventListener('click', (e) => {
    if (!mainPageLoaded) {
        buildMainPage()
        mainPageLoaded = true;
    }
})