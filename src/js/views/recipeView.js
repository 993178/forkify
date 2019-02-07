import { elements } from './base';
import { Fraction } from 'fractional';      // in de documentatie staat nog ES5/node.js-notatie "var Fraction = require('fractional').Fraction" waar je aan ziet hoe de named import moet heten en waar ie vandaan moet komen

export const clearRecipe = () => {
    elements.recipe.innerHTML = "";
}

const formatCount = count => {
    if (count) {
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));     // we pakken count, veranderen die van een getal in een string, splitsen die op bij de punt, mappen beide delen weer in een getal en destructuren ze in twee aparte variabelen

        if (!dec) return count; // als count alleen maar 2 ofzo is

        if (int === 0) {        // als count 0.5 ofzo is
            const fr = new Fraction(count);     // dit Fraction-ding verandert getallen met decimalen in breuken, blijkbaar door de input terug te geven in teller en noemer
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(count - int);       // we willen alleen een breuk maken van de decimalen, niet de helen, en bij het splitsen is de . verloren gegaan, dus de dec is nu een heel getal en niet meer .5 ofzo. Dus die zou je ook nog door 10 kunnen delen en dan aan Fraction voeren
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';     // zodat er, als er geen count is omdat er iets raars mee is, iig geen 'undefined' op die site staat
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = recipe => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

// regel 62: we gebruiken join niet om dingen te lijmen maar eigenlijk puur om er weer tekst van te maken ipv een array in onze markup