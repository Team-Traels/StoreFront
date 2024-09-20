// let basket = []
// class BasketModel {

//     constructor() {
//         this.basketItemsKey = 'basketItems';
//         this.apiUrl = 'https://dummyjson.com/products';
//         this.apiUrl = 'https://dummyjson.com/categories'; // DummyJSON API endpoint
//     }
// }
// // Hent data fra localStorage
// function getBasketItems() {
// try {
//     const items = localStorage.getItem(this.basketItemsKey);
//     if (!items) {
//         console.warn('No items found in localStorage');
//         return [];
//     }

//     const parsedItems = JSON.parse(items);

//     if (!Array.isArray(parsedItems)) {
//         console.error('Invalid data format in localStorage');
//         return [];
//     }

//     return parsedItems;
// } catch (error) {
//     console.error('Error parsing localStorage data:', error);
//     return [];
// }
// }


// // Gem data i localStorage
// function saveBasketItems(items) {
//     localStorage.setItem(this.basketItemsKey, JSON.stringify(items));
// }


//     // Hent alle produkter fra DummyJSON API med fejlhåndtering
//    function fetchAllProducts(dataReceive) {
//         fetch(this.apiUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     // Hvis HTTP status ikke er OK, kast en fejl
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json(); // Returner JSON data hvis status er OK
//             })
//             .then(data => {
//                 dataReceive(data.products); // Send produktlisten til dataReceive for klargøring til display
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error); // Log fejl
//             });
//     }

//     function dataReceive(data) {
//         console.log('hej', data);
//     }
    
//     fetchAllProducts();


// window.onload = function() {
//     getBasketItems();
//     saveBasketItems();
// };

// Model: Håndterer kurv og API-opkald
const BasketModel = (() => {
    const basketItemsKey = 'basketItems';
    const apiUrl = 'https://dummyjson.com/products'; // DummyJSON API endpoint

    // Hent data fra localStorage
    function getBasketItems() {
        try {
            const items = localStorage.getItem(basketItemsKey);
            if (!items) {
                console.warn('No items found in localStorage');
                return [];
            }

            const parsedItems = JSON.parse(items);

            if (!Array.isArray(parsedItems)) {
                console.error('Invalid data format in localStorage');
                return [];
            }

            return parsedItems;
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            return [];
        }
    }

    // Gem data i localStorage
    function saveBasketItems(items) {
        localStorage.setItem(basketItemsKey, JSON.stringify(items));
    }

    // Hent alle produkter fra DummyJSON API
    function fetchAllProducts(dataReceive) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                dataReceive(data.products); // Send produktlisten til callback
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    return {
        getBasketItems,
        saveBasketItems,
        fetchAllProducts
    };
})();

// View: Håndterer DOM-opdateringer
const BasketView = (() => {
    const basketContainer = document.getElementById('basket-container'); // Her skal du have en div med id 'basket-container'

    // Ryd visningen før opdatering
    function clearBasketDisplay() {
        basketContainer.innerHTML = '';
    }

    // Vis produkterne i kurven
    function displayBasketItems(basketItems) {
        clearBasketDisplay();
        if (basketItems.length === 0) {
            basketContainer.innerHTML = '<p>Your basket is empty</p>';
            return;
        }

        basketItems.forEach(item => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item');
            basketItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>Price: ${item.price}</p>
                <button data-id="${item.id}" class="remove-item">Remove</button>
            `;
            basketContainer.appendChild(basketItem);
        });
    }

    return {
        displayBasketItems
    };
})();

// Controller: Binder Model og View sammen
const BasketController = (() => {
    function init() {
        updateBasketView();

        // Hent produkter fra DummyJSON API og opdater kurven
        BasketModel.fetchAllProducts((products) => {
            console.log('Produkter fra API:', products);
            BasketModel.saveBasketItems(products); // Gem produkterne i localStorage
            updateBasketView();
        });

        // Lyt efter 'remove' knapper
        document.getElementById('basket-container').addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const productId = event.target.dataset.id;
                removeItemFromBasket(productId);
                updateBasketView();
            }
        });
    }

    // Opdater visningen af kurven
    function updateBasketView() {
        const basketItems = BasketModel.getBasketItems();
        BasketView.displayBasketItems(basketItems);
    }

    // Fjern produkt fra kurven
    function removeItemFromBasket(productId) {
        const basketItems = BasketModel.getBasketItems();
        const updatedBasketItems = basketItems.filter(item => item.id !== parseInt(productId));
        BasketModel.saveBasketItems(updatedBasketItems);
    }

    return {
        init
    };
})();

// Initialisering
document.addEventListener('DOMContentLoaded', () => {
    BasketController.init();
});