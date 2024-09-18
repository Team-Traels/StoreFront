   let basket = []
   
   // Hent data fra localStorage
    getBasketItems() {
        const items = localStorage.getItem(this.basket);
        return items ? JSON.parse(items) : [];
    }

        // Gem data i localStorage
        saveBasketItems(items) {
            localStorage.setItem(this.basket, JSON.stringify(items));
        }