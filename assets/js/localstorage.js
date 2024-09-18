let basket = []
class BasketModel {
    constructor() {
        this.basketItemsKey = 'basketItems';
        this.apiUrl = 'https://dummyjson.com/products';
        this.apiUrl = 'https://dummyjson.com/categories'; // DummyJSON API endpoint
    }
}
// Hent data fra localStorage
function getBasketItems() {
try {
    const items = localStorage.getItem(this.basketItemsKey);
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
    localStorage.setItem(this.basketItemsKey, JSON.stringify(items));
}

window.onload = function() {
    getBasketItems();
    saveBasketItems();
};