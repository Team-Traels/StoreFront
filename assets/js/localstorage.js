let basket = []
class BasketModel {
    constructor() {
        this.basketItemsKey = 'basketItems';
        this.apiUrl = 'https://dummyjson.com/products';
        this.apiUrl = 'https://dummyjson.com/categories'; // DummyJSON API endpoint
    }

// Hent data fra localStorage
getBasketItems() {
    const items = localStorage.getItem(this.basket);
    return items ? JSON.parse(items) : [];
}

// Gem data i localStorage
saveBasketItems(items) {
    localStorage.setItem(this.basket, JSON.stringify(items));
}