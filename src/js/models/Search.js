import axios from 'axios';       // fetch werkt niet in alle browsers, axios is beter, zet ook automatisch om in json en verwerkt errors handiger
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {        
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);   // key dus, en dan de q van query, wat de nog aan te leveren zoekterm is
            this.result = res.data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}