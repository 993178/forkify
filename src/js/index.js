// Global app controller 
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


//global state van hele app
// - Search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};


//      SEARCH CONTROLLER

const searchController = async () => {      // heet bij Jonas controlSearch, maar dat geeft teveel gekloot met Tab als ik console.log wil typen
    // get query from view
    const query = searchView.getInput();            // dus query is de zoekopdracht
    
    if (query) {
        // new search object and add to state
        state.search = new Search(query);           // en state.search is het search-object gemaakt met class Search waarin query een key is en result een andere key is met als value de receptenlijst die we met de API hebben binnengehengeld

        // prepare UI for results (loading spinner oid)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        try {
            // search for recipes
            await state.search.getResults();

            // render results on UI
            //console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result)   // zonder tweede paramter voor page te definiëren, want 1 is al de default
        } catch (error) {
            alert('Something went wrong.......')
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {     // eventlistener voor het zoekveld
    e.preventDefault();     // we willen niet de pagina herladen bij het klikken op de searchknop
    searchController();        // we zetten wat er moet gebeuren apart, niet in deze callback
});

elements.searchResPages.addEventListener('click', e => {    // eventlistener voor de paginatieknoppen. Die knoppen zitten er nog niet, dus we plakken dit ding aan het ouderelement dat er wel is en laten de klik opborrelen om dan de bron van de klik op te sporen middels target
    const btn = e.target.closest('.btn-inline');        // we willen niet weten of er op de tekst of op het icoon of op de knop zelf geklikt werd, het moet allemaal neerkomen op de dichtstbijzijnde knop zelf

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);    // de 10 om de base vast te leggen... Zeg je 2, dan krijg je binaire getallen...........     // dataset.goto -> blijkbaar worden alle properties op de html-elementen die met data beginnen ook opgeslagen in een dataset
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


//      RECIPE CONTROLLER

const recipeController = async () => {
    const id = window.location.hash.replace('#','');   // string.replace: vervang argument 1 door argument 2. We pakken hier de hash (zie searchView)

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }

        // create new recipe object
        state.recipe = new Recipe(id);  // dus een nieuw receptobject gaat ook weer de state in        
        
        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('That darn recipe just won\'t show up, I wouldn\'t take it if I were you!')
        }
    }
}

// window.addEventListener('hashchange', recipeController)
// window.addEventListener('load', recipeController);

// hoe zet je 1 eventlistener op 2 events?

['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeController));