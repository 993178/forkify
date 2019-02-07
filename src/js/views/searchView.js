import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {       // korte functie, maar tóch {},  anders krijg je een impliciete return terwijl er niks gereturnd wordt
    elements.searchInput.value = "";    // leegmaken is dus gelijk stellen aan een lege ""
};

export const clearResults = () => {             // bij een nieuwe zoekopdracht wil je niet dat de resultaten van de vorige er nog staan
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";     // zodat je geen stapel knoppen krijgt als je van de ene naar de andere pagina gaat
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));     // een array met alle html-elementen met die class
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');    // waarmee je het element met die specifieke href kunt selecteren...! a is van 'attribute'. Vervolgens voeg je dus een class toe aan dat element die zorgt voor de verandering in opmaak die je wilt
}

const limitRecipeTitle = (title, limit = 17) => {   // Jonas wil graag de titel inkorten tot enkele hele woorden als die nu langer is dan één regel. (Categorie waarom makkelijk doen als het moeilijk kan)
    const newTitle = [];                            // (Persoonlijk denk ik dat halve woorden een stuk beter zijn dan een recept dat alleen maar "beef & ..." heet.)
    if (title.length > limit) {                     // Als de lengte van de titel meer dan 17 karakters is,
        title.split(' ').reduce((teller, cur) => {  // splitsen we de titel op in individuele woorden door de spaties als afbreekpunt te gebruiken
            if (teller + cur.length <= limit) {     // en kijken of de teller (=initial value, vorige item) plus de lengte van het huidige woord onder de limiet blijft
                newTitle.push(cur);                 // Zo ja, dan pushen we dat huidige woord in de newTitle-array
            }
            return teller + cur.length              // Zo niet (?), dan returnen we de teller + de lengte van het huidige woord - dus eigenlijk wat je in de if gestopt hebt
        }, 0);                                      // (initial value is 0)
        return `${newTitle.join(' ')} ...`;         // 
    }   // geen else, er hoeft niks specifieks te gebeuren als ie korter is dan 17
    return title;
}

const renderRecipe = recipe => {            // regel 31: je zet de recipe_id in de href, dus dat is in het precieze adres: localhost:8080/?# en dan het ID-nummer van dat recept. Dat ding, # + nummer, heet de hash.
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}"> 
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;      // hoeft niet meer in 1 regel!
    elements.searchResList.insertAdjacentHTML('beforeend', markup);     // markup met variabelen erin gooien aan het einde van de lijst in results__list
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;      // we laten deze functie alleen maar de markup returnen. data-goto is de info over waar de button je heen moet leiden...

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);   // totaal aantal pagina's is totaal aantal resultaten gedeeld door aantal resultaten per pagina, afgerond naar boven

    let button;     // let buiten de if, anders krijgen we hem er niet uit
    if (page === 1 && pages > 1) {  // we willen geen next button als er maar 1 pagina is
        // button next
        button = createButton(page, 'next');
    } else if (page < pages) {      // ik zou dus geneigd zijn deze gewoon in de else te gooien
        // button prev and next
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
        // okee... je callt dus die createbuttonfunctie twee keer en krijgt dat twee keer die markup terug, maar dan dus met `` rondom iedere button en ook rondom beide buttons. Is kennelijk geen probleem
    } else if (page === pages && pages > 1) {
        // button prev
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {  // voor de pagination, het opdelen van de lijst met resultaten in pagina's met 10 items per pagina
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;    // slice is exclusief de eindwaarde, dus eind 10 = t/m 9
    recipes.slice(start, end).forEach(renderRecipe);      // dus geen el => renderRecipe(el);  maar gewoon de hele functie erin plempen, en het argument wordt automatisch doorgegeven. Ik vraag me af en toe af of dit niet ook kan, maar hier kan het dus...

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};