let basket = []
let products = []

// FETCH PRODUCTS
function getProducts() {
    // Fetcher products
    fetch('https://dummyjson.com/products')
        .then(function (response) {
            // Tjekker om responsen er ok
            if (!response.ok) {
                // Hvis ikke, giver en fejl
                throw new Error('Error: Fejlede I at hente produkter');
            }
            // Konveterer responsen til json
            return response.json();
        })
        .then(function (data) {
            // Tjekker om resonsen er I det rigtige format
            if (data && Array.isArray(data.products)) {
                // Hvis data er korrekt, giv det vidre til receivedProducts
                receivedProducts(data.products);
                products = data.products


            } else {
                // Hvis dataformatet er forkert, giv en error!
                throw new Error('Error: Forkert data format');
            }
        })
        // Alle errors bliver catched her
        .catch(function (error) {
            console.error(error.message);
            errorData();
        });
}

function errorData() {
    console.log('Nej, vi har ikke hvad du skal bruge!');
}
function receivedProducts(products) {

    if (!firstTimePageLoaded) {
        buildMainPage(products)
        firstTimePageLoaded = true;

    }
}


function saveLocalData() {
    let saveableData = JSON.stringify(basket)
    localStorage.setItem('data', saveableData)
}

const logoDocument = document.getElementById('logo')
const basketDocument = document.getElementById('basket')
const mainContent = document.getElementById('content')

let mainPageLoaded = true
let basketPageLoaded = false
let firstTimePageLoaded = false

logoDocument.addEventListener('click', (e) => {
    if (!mainPageLoaded) {
        buildMainPage()
        mainPageLoaded = true;
        basketPageLoaded = false;
    }
})

// basketDocument.addEventListener('click', (e) => {
//     if (!basketPageLoaded) {
//         buildMainPage()
//         basketPageLoaded = true;
//         mainPageLoaded = false;
//     }
// })


function productCallback(productID) {
    bygProductPage(productID)
}

function buildMainPage(products) {
    let randomNumber = Math.round(Math.random() * products.length)
    let featuredProduct = products[randomNumber]
    mainContent.innerHTML = ''
    let featuredProductHTML = `
    <div class="featured-product">
        <img src="${featuredProduct.thumbnail}" alt="${featuredProduct.title}">
        <h2>${featuredProduct.title}</h2>
        <p>${featuredProduct.price}$</p>
        <button onclick="productCallback(${featuredProduct.id})">Læs mere</button>`
    mainContent.innerHTML = featuredProductHTML

}

function bygProductPage(productID) {
    let product = products.find(product => product.id == productID)
    mainContent.innerHTML = ''
    let productHTML = `
    <div class="product">
        <img src="${product.thumbnail}" alt="${product.title}"> 
        <div> 
        <img src="${product.thumbnail}" alt="${product.title}"> 
        <img src="${product.thumbnail}" alt="${product.title}"> 
        <img src="${product.thumbnail}" alt="${product.title}"> 
        </div>
        <h2>${product.title}</h2>
        <p>${product.price}$</p>
        <p>${product.description}</p>
        <button onclick="addToBasket(${product.id})">Læg i kurv</button>`
    mainContent.innerHTML = productHTML
    mainPageLoaded = false
    basketPageLoaded = false
}

function addToBasket(productID) {
    if (basket.length == 0) {
        let product = products.find(product => product.id == productID)
        product.amount = 1
        basket.push(product)
    } else {
        let product = products.find(product => product.id == productID)
        let productInBasket = basket.find(product => product.id == productID)
        if (productInBasket) {
            productInBasket.amount++
        } else {
            basket.push(product)
        }
    }

    saveLocalData()
    console.log(basket)
}

// Køre funktionen når siden loader
window.addEventListener('load', (e) => {
    getProducts();
});