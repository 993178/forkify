import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {       // korte functie, maar tóch {},  anders krijg je een impliciete return terwijl er niks gereturnd wordt
    elements.searchInput.value = "";    // leegmaken is dus gelijk stellen aan een lege ""
};

export const clearResults = () => {             // bij een nieuwe zoekopdracht wil je niet dat de resultaten van de vorige er nog staan
    elements.searchResList.innerHTML = "";
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
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