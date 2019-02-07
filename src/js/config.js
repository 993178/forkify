// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get

export const proxy = 'https://cors-anywhere.herokuapp.com/'    // trucje om te zorgen dat hun server denkt dat wij op dezelfde server zitten
export const key = "c4cb44f2ca2dab584aabee22088a8215"      // dit is mijn API-key

// Jonas: in het echt moet je deze info NIET hier aan de client side neerzetten, want die wordt dus openbaar...
// Jonas: je zou de AJAX calls op je eigen server moeten doen met je eigen API van die server, en dan vanaf daar de call doen in the front end client. 
// Okee dan... :-S