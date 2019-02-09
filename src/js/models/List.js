import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count, 
            unit, 
            ingredient
        }
        this.items.push(item);
        return item;            // good practice, zegt Jonas, maar in index.js gebruiken we dit om het nieuwgemaakte item direct door te geven aan listView.renderItem, dus... 
    }

    deleteItem(id) {            // SLicemethode: [2, 4, 6].slice(1, 2) --> pakt array-items van eerste parameter tot (NIET t/m!) tweede parameter, muteert NIET de originele array en returnt hier dus alleen 4
        const index = this.items.findIndex(el => el.id === id);     // vergelijk de id van elk element uit de boodschappenlijst met de parameter id en vertel ons welke index dat te elimineren element heeft
        this.items.splice(index, 1)      // SPLicemethode: [2, 4, 6].splice(1, 2) --> returnt [4, 6], muteert WEL originele array tot [2]
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;       // zet de count van het lijstitem met dezelfde id als de parameter id gelijk aan de nieuwehoeveelheidsparameter
    }
}