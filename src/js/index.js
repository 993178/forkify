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
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {     // eventlistener voor het zoekveld
    e.preventDefault();     // we willen niet de pagina herladen bij het klikken op de searchknop
    controlSearch();        // we zetten wat er moet gebeuren apart, niet in deze callback
})