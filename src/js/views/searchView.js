import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {       // korte functie, maar tóch {},  anders krijg je een impliciete return terwijl er niks gereturnd wordt
    elements.searchInput.value = "";    // leegmaken is dus gelijk stellen aan een lege ""
};

export const clearResults = () => {             // bij een nieuwe zoekopdracht wil je niet dat de resultaten van de vorige er nog staan
    elements.searchResList.innerHTML = "";
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

const renderRecipe = recipe => {
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

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);      // dus geen el => renderRecipe(el);  maar gewoon de hele functie erin plempen, en het argument wordt automatisch doorgegeven. Ik vraag me af en toe af of dit niet ook kan, maar hier kan het dus...
};