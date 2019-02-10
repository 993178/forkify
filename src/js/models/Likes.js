export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img };
        this.likes.push(like);

        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;     // check of the index van het item met deze id op de lijst gelikete items iets anders teruggeeft dan -1 ('bestaat niet'), ofwel, kijk of ie op de lijst staat. Is hier geen lijst.includes-methode voor??
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));  // settermethode om via JSON.stringify alle likes in localStorage (zit op window, dus global access) op te slaan zodat die info nog bestaat na het herladen van de pagina!
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));      // gettermethode om, via JSON.parse ditmaal, de data uit de localStorage te halen en te ontstringifyen
        if (storage) this.likes = storage;  // zet de data, als die er is, uit de localStorage terug in this.likes
    }
}