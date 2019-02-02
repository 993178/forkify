// Global app controller 
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

//global state van hele app
// - Search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};


const controlSearch = async () => {
    // get query from view
    const query = 'pizza' // later
    
    if (query) {
        // new search object and add to state
        state.search = new Search(query);

        // prepare UI for results (loading spinner oid)
        // search for recipes
        await state.search.getResults();

        // render results on UI
        console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {     // eventlistener voor het zoekveld
    e.preventDefault();     // we willen niet de pagina herladen bij het klikken op de searchknop
    controlSearch();        // we zetten wat er moet gebeuren apart, niet in deze callback
})

//search.getResults();