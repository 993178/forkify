import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {       // deze functie krijgt bij de call doodleuk true/false gevoerd - die hele isLiked heeft er geen reet mee te maken...!
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);    // dus we stellen de href in op dat img/icons-ding met de variabele erin, en die variabele hangt dan weer af van of het recept geliket is of niet.
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('afterbegin', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;   // selecteer het likes__link-element met een href met daarin deze id, en dan daar de ouder van (de hele li, niet alleen wat erin zit)
    if (el) el.parentElement.removeChild(el);       // "Hey, kid..."
}