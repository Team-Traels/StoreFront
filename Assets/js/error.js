// Model
function fetchData(url, callback) {
    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        callback(null, data);
      })
      .catch(function(error) {
        // Når en fejl opstår, sender vi fejlbeskeden til callback
        callback(error.message, null);
      });
  }
  
  // View
  function displayError(message) {
    var errorContainer = document.getElementById('error-message');
    if (errorContainer) {
      errorContainer.textContent = message;
    } else {
      console.error('Error container not found');
    }
  }
  
  // Controller
  function loadData(url) {
    fetchData(url, function(error, data) {
      if (error) {
        displayError(error);
        handleFetchError(); // Kalder en ny funktion ved fejl
      } else {
        // Håndter data korrekt, hvis der ikke er fejl
        console.log(data);
      }
    });
  }
  
  function handleFetchError() {
    // Ny funktion til at håndtere fejl
    console.log('En fejl opstod. Prøver igen med en anden funktion...');
    retryFetch();
  }
  
  function retryFetch() {
    // Eksempel på at prøve at hente data igen
    console.log('Prøver at hente data igen...');
    loadData('https://dummyjson.com/products'); // Ændret til korrekt URL
  }
  
  // Initialisering af controlleren, som starter fetch
  loadData('https://dummyjson.com/invalid-url');