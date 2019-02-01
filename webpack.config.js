// hier vertellen we webpack wat ie precies moet omzetten en samenvoegen tot wat
const path = require('path');   // we hebben een absoluut path nodig

module.exports = {
    entry: './src/js/index.js',   // hier begint webpack met packen
    output: {
        path: path.resolve(__dirname, 'dist/js'),           // we gebruiken een path method uit het ding van regel 2 om naar de juiste map te verwijzen. __dirname is the current absolute path, en die koppelen we aan de map waar we de bundel in willen hebben: dist/js
        filename: 'bundle.js'   // standaardnaam
    }
}   // we missen nog loaders en plugins, met entry en output de 4 noodzakelijke onderdelen van de webpackconfiguratie
// ook nodig: webpack toevoegen als apart script in de package.json zodat ie dit ding gaat zoeken en doet wat de bedoeling is
// ook nodig: installeren van het pakket waarmee je daadwerkelijk iets met webpack kunt doen...: webpack-cli --save-dev (want het is een devtool dat je in je package.json vermeld wilt hebben)

// na output en voor de loaders en plugins hadden we nog mode: 'development' om snel code te verwerken terwijl je bezig bent met bouwen, terwijl andere optie production voor het grondige, uiteindelijke proces is met minifying en weet ik wat meer om het te uploaden pakket zo klein mogelijk te houden
// maar het is makkelijker om mode niet hier te zetten maar in het npm script in de package.json zodat je het niet op het eind hoeft te veranderen
