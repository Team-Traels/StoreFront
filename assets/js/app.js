let basket = []
let productsFromFetch = []

// FETCH LOCAL DATA
function getLocalData() {
    let localData = localStorage.getItem('data')
    if (localData) {
        basket = JSON.parse(localData)
    }
}

// FETCH PRODUCTS
function getProducts() {
    // Fetcher products
    fetch('https://dummyjson.com/products')
        .then(function (response) {
            // Tjekker om responsen er ok
            // console.log(response.json());
            
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
                productsFromFetch = data.products
                receivedProducts(data.products);


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
const mainContent = document.getElementById('content')
const basketContainer = document.getElementById('basket-section')

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

basketContainer.addEventListener('click', (e) => {
    if (!basketPageLoaded) {
        bygBasketPage()
        basketPageLoaded = true;
        mainPageLoaded = false;
    }

})


function productCallback(productID) {
    bygProductPage(productID)
}

function buildMainPage(products) {
    
    let randomNumber = Math.round(Math.random() * productsFromFetch.length)
    let featuredProduct = productsFromFetch[randomNumber]
    mainContent.innerHTML = ''
    let featuredProductHTML = `
    <div class="featured-product">
        <img src="${featuredProduct.thumbnail}" alt="${featuredProduct.title}">
        <h2>${featuredProduct.title}</h2>
        <p>${featuredProduct.price}$</p>
        <button onclick="productCallback(${featuredProduct.id})">Læs mere</button>
        </div>`
    mainContent.innerHTML = featuredProductHTML

}

function bygProductPage(productID) {
    let product = productsFromFetch.find(product => product.id == productID)
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
        let product = productsFromFetch.find(product => product.id == productID)
        product.amount = 1
        basket.push(product)
    } else {
        let product = productsFromFetch.find(product => product.id == productID)
        let productInBasket = basket.find(product => product.id == productID)
        if (productInBasket) {
            productInBasket.amount++
        } else {
            product.amount = 1
            basket.push(product)
        }
    }

    saveLocalData()
}

function bygBasketPage() {
    let total = 0
    console.log(basket);
    
    mainContent.innerHTML = ''
    basketHTML = `
     <div class="basket">
        <h2>Din kurv</h2>
        <div id="basket-items"></div>
        <h3>Total: ${basket.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2)}$</h3>
        <button onclick="buy()">Køb</button>
        <button onclick="emptyBasket()">Tøm kurv</button>`
        basket.forEach(item => {
            console.log(`item.price: ${item.price}, item.amount: ${item.amount}`);
            total += item.price * item.amount;
        });
        
        
    mainContent.innerHTML = basketHTML
    mainPageLoaded = false
    basketPageLoaded = true

    const itemsInBasket = document.getElementById('basket-items');
    
    
    let basketItems = basket.forEach(item => {
        const basketItem = document.createElement('div');
        basketItem.classList.add('basket-item');
        basketItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <h4>${item.title}</h4>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button data-id="${item.id}" onclick="amountIncreased(${item.id})" class="amount-increase"><</button>
            <p>${item.amount}</p>
            <button data-id="${item.id}" onclick="amountDecreased(${item.id})" class="amount-decrease">></button>
            <button data-id="${item.id}" onclick="removeItemFromBasket(${item.id})" class="remove-item">Remove</button>
        `;
        itemsInBasket.appendChild(basketItem);
    
    })
}

function emptyBasket() {
    basket = []
    saveLocalData()
    bygBasketPage()
}

function amountIncreased(productID) {
    let product = basket.find(product => product.id == productID)
    product.amount++
    saveLocalData()
    bygBasketPage()
}

function amountDecreased(productID) {
    
    let product = basket.find(product => product.id == productID)
    product.amount--
    if (product.amount == 0) {
        removeItemFromBasket(productID)
    }
    saveLocalData()
    bygBasketPage()
}

function removeItemFromBasket(productID) {
    let product = basket.find(product => product.id == productID)
    let index = basket.indexOf(product)
    basket.splice(index, 1)
    saveLocalData()
    bygBasketPage()
}

// Køre funktionen når siden loader
window.addEventListener('load', (e) => {
    getProducts();
    getLocalData();
});