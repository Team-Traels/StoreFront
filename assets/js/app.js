let basket = []
let productsFromFetch = []
let categoryList = []

let myCategoryData = [
    {
        name: 'Fashion',
        categories: [],
        KeyWords: ['woman', 'womens', 'dresses', 'man', 'mens', "sunglasses", "tops"]
    },
    {
        name: 'Pleje',
        categories: [],
        KeyWords: ['beauty', "fragrances", "skin-care"]
    },
    {
        name: 'Electronics',
        categories: [],
        KeyWords: ['phone', 'laptop', 'mobile', 'tablets']
    },
    {
        name: 'Alt til hjemmet',
        categories: [],
        KeyWords: ["furniture", "home-decoration", "kitchen-accessories"]
    },
    {
        name: 'Sport',
        categories: [],
        KeyWords: ["sport"]
    },
    {
        name: 'Transport',
        categories: [],
        KeyWords: ["motorcycle", "vehicle"]
    },
    {
        name: 'Dagligvare',
        categories: [],
        KeyWords: ['groceries']
    },
    
]

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

function getCategories() {
    fetch('https://dummyjson.com/products/category-list')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error: Fejlede I at hente kategorier!');
            }
            return response.json();
        })
        .then(function (data) {
            // Tjekker om resonsen er I det rigtige format
            if (Array.isArray(data)) {
                categoryList = data
                // sortIntocategories()
                receivedCategories(data);
            } else {
                throw new Error('Error: Forkert data format');
            }
        })
        .catch(function (error) {
            console.error(error.message);
            errorData();
        });
}

function fetchCategory(category) {
    console.log(`https://dummyjson.com/products/category/${category}`);
    
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error: Fejlede I at hente kategorier!');
            }
            return response.json();
        })
        .then(function (data) {
            // Tjekker om resonsen er I det rigtige format
            if (typeof data === 'object') {
                singleCategoryReceived(data);
            } else {
                throw new Error('Error: Forkert data format');
            }
        })
        .catch(function (error) {
            console.error(error.message);
            errorData();
        });
}

function fetchSearch(search) {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error: Fejlede I at hente kategorier!');
            }
            return response.json();
        })
        .then(function (data) {
            // Tjekker om resonsen er I det rigtige format
            if (typeof data === 'object') {
                searchReceived(data);
            } else {
                throw new Error('Error: Forkert data format');
            }
        })
        .catch(function (error) {
            console.error(error.message);
            errorData();
        });
}

// console.log(fetchSearch('phones'));

function searchReceived(data) {
    console.log(data);
    if(data.products.length == 0) {
        mainContent.innerHTML = '<h1>Vi har desværre ikke det du søger!</h1>'
    } else {
    bygCategoryPage(data.products)
    }
}

// console.log(fetchCategory('phones'));





function singleCategoryReceived(data) {
    bygCategoryPage(data.products)
}


function receivedCategories(categories) {
    sortIntocategories()
}


function errorData() {
    console.log('Nej, vi har ikke hvad du skal bruge!');
}
function receivedProducts(products) {

    if (!firstTimePageLoaded) {
        buildMainPage(products)
        firstTimePageLoaded = true;
        basketIndicatorUpdate()
    }
}


function saveLocalData() {
    let saveableData = JSON.stringify(basket)
    localStorage.setItem('data', saveableData)
    basketIndicatorUpdate()
}

const logoDocument = document.getElementById('logo')
const mainContent = document.getElementById('content')
const basketContainer = document.getElementById('basket-section')
const basketIndicator = document.getElementById('indicator-number')
const myCategoryContainer = document.getElementById('navCategories')
const searchInput = document.getElementById('search')

let firstTimePageLoaded = false

logoDocument.addEventListener('click', (e) => {
        buildMainPage()
       
})

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchSearch(searchInput.value)
    }
})

basketContainer.addEventListener('click', (e) => {
        bygBasketPage()
     
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
        <section>
        <h2>${featuredProduct.title}</h2>
        <p>${featuredProduct.price}$</p>
        <button onclick="productCallback(${featuredProduct.id})">Læs mere</button>
        </section>
        </div>`
    mainContent.innerHTML = featuredProductHTML

}

function bygProductPage(productID) {
    let product = productsFromFetch.find(product => product.id == productID)
    mainContent.innerHTML = ''
    let productHTML = `
    <div class="product-site">
        <div class="product">
            <figure>
                <img src="${product.thumbnail}" alt="${product.title}">  
            </figure>
            <figure>
                <img src="${product.thumbnail}" alt="${product.title}"> 
                <img src="${product.thumbnail}" alt="${product.title}"> 
                <img src="${product.thumbnail}" alt="${product.title}">
            </figure>
            <div>
                <h1>${product.price}$</h1>
            </div>
        </div>
            <figcaption class="product-info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <button onclick="addToBasket(${product.id})">Læg i kurv</button>
            </figcaption>
    </div>`
    mainContent.innerHTML = productHTML
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

function sortIntocategories() {

    // looper gennem alle kategori navne
    categoryList.forEach((myCatName) => {

        let foundFlag = false
        myCategoryData.forEach((mycategory, index) => {


            if (!foundFlag && checkCategory(myCatName, myCategoryData[index].KeyWords)) {
                mycategory.categories.push(myCatName)
                foundFlag = true
            }
        })

        if (!foundFlag) {
            myCategoryData[myCategoryData.length - 1].categories.push(myCatName)
        }
    })

    buildCategories()
}

function checkCategory(myCategory, checkArray) {

    let found = checkArray.some((checkWord) => {
        return myCategory.includes(checkWord)
    })
    return found
}

function buildCategories() {
        let categoryHTML = ''
    myCategoryData.forEach((category, index) => {
         categoryHTML  += `
        <ul class="category navCategories">
        <li class="nav-item">
            <p>${category.name}</p>
            <ul class="dropdown"><p ">`

            category.categories.forEach((cat) => {
                categoryHTML += `<li onclick="fetchCategory('${cat}')">${cat}</li>`
            })

            categoryHTML += `</p></ul>
            </li>
        </ul>`

        myCategoryContainer.innerHTML = categoryHTML
        })



}

function bygCategoryPage(products) {
    mainContent.innerHTML = ''
    let categoryHTML = '<div class="product-section">'
    products.forEach((product) => {
        categoryHTML += `
        <div class="product">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div>
            <h2>${product.title}</h2>
            <p>${product.price}$</p>
            </div>
            <button onclick="productCallback(${product.id})">Læs mere</button>
        </div>`
    })
    categoryHTML += '</div>'
       mainContent.innerHTML = categoryHTML
        
}



function bygBasketPage() {
    let total = 0

    mainContent.innerHTML = ''
    basketHTML = `
     <div class="basket">
        <div id="basket-items"></div>
        <div id="total">
        <h3>Total: ${basket.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2)}$</h3>
        <button onclick="buy()">Køb</button>
        <button onclick="emptyBasket()">Tøm kurv</button>`
    basket.forEach(item => {
        console.log(`item.price: ${item.price}, item.amount: ${item.amount}`);
        total += item.price * item.amount;
    });


    mainContent.innerHTML = basketHTML

    const itemsInBasket = document.getElementById('basket-items');


    let basketItems = basket.forEach(item => {
        const basketItem = document.createElement('div');
        basketItem.classList.add('basket-item');
        basketItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <h4>${item.title}</h4>
            <p id="price">Price: ${item.price.toFixed(2)}</p>
            <div class="amount-container">
            <button data-id="${item.id}" onclick="amountIncreased(${item.id})" class="amount-increase"><</button>
            <p id="amount">${item.amount}</p>
            <button data-id="${item.id}" onclick="amountDecreased(${item.id})" class="amount-decrease">></button>
            </div>
            <button data-id="${item.id}" onclick="removeItemFromBasket(${item.id})" class="remove-item">Slet</button>
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

function basketIndicatorUpdate() {
    let amount = 0
    basketAmount = basket.forEach(item => {
        amount += item.amount
    })
    basketIndicator.innerHTML = amount
}

// Køre funktionen når siden loader
window.addEventListener('load', (e) => {
    getProducts();
    getLocalData();
    getCategories();
});