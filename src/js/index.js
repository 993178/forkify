// Global app controller 
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


//global state van hele app
// - Search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};


const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();            // dus query is de zoekopdracht
    
    if (query) {
        // new search object and add to state
        state.search = new Search(query);           // en state.search is het search-object gemaakt met class Search waarin query een key is en result een andere key is met als value de receptenlijst die we met de API hebben binnengehengeld

        // prepare UI for results (loading spinner oid)
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        // search for recipes
        await state.search.getResults();

        // render results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result)   // zonder tweede paramter voor page te definiëren, want 1 is al de default
    }
}

elements.searchForm.addEventListener('submit', e => {     // eventlistener voor het zoekveld
    e.preventDefault();     // we willen niet de pagina herladen bij het klikken op de searchknop
    controlSearch();        // we zetten wat er moet gebeuren apart, niet in deze callback
});

elements.searchResPages.addEventListener('click', e => {    // eventlistener voor de paginatieknoppen. Die knoppen zitten er nog niet, dus we plakken dit ding aan het ouderelement dat er wel is en laten de klik opborrelen om dan de bron van de klik op te sporen middels target
    const btn = e.target.closest('.btn-inline');        // we willen niet weten of er op de tekst of op het icoon of op de knop zelf geklikt werd, het moet allemaal neerkomen op de dichtstbijzijnde knop zelf

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);    // de 10 om de base vast te leggen... Zeg je 2, dan krijg je binaire getallen...........     // dataset.goto -> blijkbaar worden alle properties op de html-elementen die met data beginnen ook opgeslagen in een dataset
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});