// --------------------------MODEL------------------------------------
const BasketModel = (() => {
    // Henter produkter fra API
    function fetchAllProducts(callback) {
        fetch('https://dummyjson.com/products')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error: Fejlede I at hente produkter');
                }
                return response.json();
            })
            .then(function(data) {
                if (data && Array.isArray(data.products)) {
                    callback(data.products); // Callback til Controller for at modtage produkterne
                } else {
                    throw new Error('Error: Forkert data format');
                }
            })
            .catch(function(error) {
                console.error(error.message);
                errorData();
            });
    }

    // Henter kategorier fra API
    function fetchAllCategories(callback) {
        fetch('https://dummyjson.com/products/categories')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error: Fejlede I at hente kategorier!');
                }
                return response.json();
            })
            .then(function(data) {
                if (Array.isArray(data)) {
                    callback(data); // Callback til Controller for at modtage kategorierne
                } else {
                    throw new Error('Error: Forkert data format');
                }
            })
            .catch(function(error) {
                console.error(error.message);
                errorData();
            });
    }

    // Hent produkter fra localStorage
    function getBasketItems() {
        return JSON.parse(localStorage.getItem('basketItems')) || [];
    }

    // Gem produkter i localStorage
    function saveBasketItems(items) {
        localStorage.setItem('basketItems', JSON.stringify(items));
    }

    return {
        fetchAllProducts,
        fetchAllCategories,
        getBasketItems,
        saveBasketItems
    };
})();

// --------------------------VIEW------------------------------------
const BasketView = (() => {
    const basketContainer = document.getElementById('basket-container');
    const categoriesContainer = document.getElementById('categories-container');

    // Ryd visningen før opdatering
    function clearBasketDisplay() {
        basketContainer.innerHTML = '';
    }

    // Vis produkter i kurven
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

    // Vis kategorier
    function displayCategories(categories) {
        categoriesContainer.innerHTML = ''; // Rydder eksisterende kategorier

        categories.forEach(function(category) {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('category-item');
            categoryElement.textContent = category;
            categoriesContainer.appendChild(categoryElement);
        });
    }

    return {
        displayBasketItems,
        displayCategories
    };
})();

// --------------------------CONTROLLER------------------------------------
const BasketController = (() => {
    function init() {
        // Opdater kurv-visning
        updateBasketView();

        // Hent produkter fra API og gem dem i kurven
        BasketModel.fetchAllProducts((products) => {
            console.log('Produkter fra API:', products);
            BasketModel.saveBasketItems(products); // Gem produkterne i localStorage
            updateBasketView();
        });

        // Hent kategorier fra API og vis dem
        BasketModel.fetchAllCategories((categories) => {
            console.log('Kategorier fra API:', categories);
            BasketView.displayCategories(categories); // Vis kategorier i View
        });

        // Lyt efter klik på 'remove' knapper
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

// Initialisering når siden loader
document.addEventListener('DOMContentLoaded', () => {
    BasketController.init();
});
