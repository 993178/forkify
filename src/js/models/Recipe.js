import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id
    }
    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;        // deze shit komt dus allemaal uit het object recipe nummer [id]
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('Something went wrong. Guess you won\'t have dinner tonight.')
        }
    }

    calcTime() {    // Jonas' zeer grove schatting van de bereidingstijd: een kwartier per 3 ingrediënten...
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;       // dus hij wil kennelijk de bereidingstijd afronden op kwartieren, anders had je dit natuurlijk gewoon als this.ingredients.length * 5 kunnen doen...
    }
    calcServings() {
        this.servings = 4;  // dat zuigt ie dus gewoon al helemaal uit zijn duim
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound', 'kilograms', 'kilogram', 'grams', 'gram', 'liter', 'litre', 'milliliter', 'millilitre', 'centiliter', 'centilitre'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lbs', 'lbs', 'kg', 'kg', 'g', 'g', 'l', 'l', 'ml', 'ml', 'cl', 'cl'];
        const units = [...unitsShort, 'package', 'packages', 'slice', 'slices', 'unit', 'units']

        const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase();  // omdat die gekke Amerikanen ook weleens Tablespoon schrijven
            unitsLong.forEach((unit, i) => {    // voor elk item uit unitsLong vervangen we dat item uit ingredient door het corresponderende item uit unitsShort. Ik vind het wel sterk dat je op deze manier dus individuele woorden uit zo'n ingredientstring kunt vervangen, maar zo werkt dus die replacemethode 
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');       // van string naar arrays van strings
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));    // check onze array met ingredientbrokken op het voorkomen van een element uit de unitsShort-array. Als ie niks vindt, returnt ie -1. Wat de vraag oproept of we daar niet een zootje mogelijke eenheden aan moeten toevoegen, zoals package
            
            let objIng;
            if (unitIndex > -1) {   // er is een of andere eenheid als teaspoon, cup, whatever
                const arrCount = arrIng.slice(0, unitIndex);    // het gedeelte met nummers is alles vóór de unit, ofwel alles van [0] tot de index van de unit
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));    // voor die idioten die "1-1/3 teaspoon" schrijven
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));  // dus je neemt het gedeelte van arrIng met de getallen erin (['4', '1/2'] oid), plakt die aan elkaar met een + zodat het een sommetje wordt, en laat eval dat sommetje uitrekenen
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1)
                }

            } else if (parseInt(arrIng[0], 10)) {       // er is geen eenheid maar wel een getal (1 brood)
                objIng = {
                    count: eval(arrIng[0]),     // parseInt of parseFloat helpt niet bij "1/2 teaspoon"
                    unit: "",
                    ingredient: arrIng.slice(1).join(' ')   // we willen de array vanaf [1] (dus zonder het eerste element), en dan dat alles samenvoegen met spaties ertussen
                }
            } else if (unitIndex === -1) {      // geen getal, geen eenheid
                objIng = {
                    count: 1,
                    unit: "",
                    ingredient
                }
            }
            
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}