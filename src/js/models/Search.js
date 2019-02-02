import axios from 'axios';       // fetch werkt niet in alle browsers, axios is beter, zet ook automatisch om in json en verwerkt errors handiger
// c4cb44f2ca2dab584aabee22088a8215

// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'    // trucje om te zorgen dat hun server denkt dat wij op dezelfde server zitten
        const key = "c4cb44f2ca2dab584aabee22088a8215"      // dit is mijn API-key
        
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);   // key dus, en dan de q van query, wat de nog aan te leveren zoekterm is
            this.result = res.data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}