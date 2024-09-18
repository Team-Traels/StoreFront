// --------------------------MODEL FETCHER------------------------------------
function getProducts() {
    // Fetcher products
    fetch('https://dummyjson.com/products')
      .then(function(response) {
        // Tjekker om responsen er ok
        if (!response.ok) {
          // Hvis ikke, giver en fejl
          throw new Error('Error: Fejlede I at hente produkter');
        }
        // Konveterer responsen til json
        return response.json();
      })
      .then(function(data) {
        // Tjekker om resonsen er I det rigtige format
        if (data && Array.isArray(data.products)) {
          // Hvis data er korrekt, giv det vidre til receivedProducts
          receivedProducts(data.products);
        } else {
          // Hvis dataformatet er forkert, giv en error!
          throw new Error('Error: Forkert data format');
        }
      })
      // Alle errors bliver catched her
      .catch(function(error) {
        console.error(error.message);
        errorData();
      });
  }
  
  function getCategories() {
    fetch('https://dummyjson.com/products/categories')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Error: Fejlede I at hente kategorier!');
        }
        return response.json();
      })
      .then(function(data) {
        // Tjekker om resonsen er I det rigtige format
        if (Array.isArray(data)) {
          receivedCategories(data);
        } else {
          throw new Error('Error: Forkert data format');
        }
      })
      .catch(function(error) {
        console.error(error.message);
        errorData();
      });
}

  
  function receivedProducts(products) {
    console.log(products);
  }

  function receivedCategories(categories) {
    console.log(categories);
  }

  function errorData() {
    console.log('Nej, vi har ikke hvad du skal bruge!');
  }

  getProducts();
  getCategories();
  // --------------------------------------------------------------