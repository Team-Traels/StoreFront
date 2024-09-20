let basket = []


function saveLocalData() {
    let saveableData = JSON.stringify(basket)
    localStorage.setItem('data', saveableData)
}

const logoDocument = document.getElementById('logo')
const basketDocument = document.getElementById('basket')

let mainPageLoaded = true
let basketPageLoaded = false

logoDocument.addEventListener('click', (e) => {
    if (!mainPageLoaded) {
        buildMainPage()
        mainPageLoaded = true;
        basketPageLoaded = false;
    }
})

basketDocument.addEventListener('click', (e) => {
    if (!basketPageLoaded) {
        buildMainPage()
        basketPageLoaded = true;
        mainPageLoaded = false;
    }
})