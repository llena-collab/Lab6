// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
	// A9. Legge 'recipes' dal localStorage. 
// Se è vuoto, DEVE restituire un array vuoto [] per evitare l'errore .forEach
function getRecipesFromStorage() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

// A10 & A11. Prende l'array e crea le card
function addRecipesToDocument(recipes) {
  const main = document.querySelector('main');
  // Se recipes non è un array, il codice si fermerà qui con l'errore che hai visto
  recipes.forEach((recipe) => {
    const card = document.createElement('recipe-card');
    card.data = recipe;
    main.append(card);
  });
}

// B1. Salva l'array nel localStorage
function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Gestore del modulo (B2 - B13)
function initFormHandler() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impedisce il refresh della pagina

    // B4 - B5. Estrae i dati dal modulo
    const formData = new FormData(form);
    const recipeObject = {};
    formData.forEach((value, key) => {
      recipeObject[key] = value;
    });

    // B6 - B8. Crea la card e la aggiunge SUBITO alla pagina
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipeObject;
    document.querySelector('main').append(recipeCard);

    // B9. Salva la nuova ricetta nel localStorage per non perderla
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  // B10 - B13. Gestione pulsante "Clear"
  const clearButton = document.querySelector('.danger');
  clearButton.addEventListener('click', () => {
    localStorage.clear();
    document.querySelector('main').innerHTML = '';
  });
}