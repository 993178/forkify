// hier vertellen we webpack wat ie precies moet omzetten en samenvoegen tot wat
const path = require('path');   // we hebben een absoluut path nodig
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],   // hier begint webpack met packen, en dat moet dus ook 'vanuit' babel-polyfill
    output: {
        path: path.resolve(__dirname, 'dist'),           // we gebruiken een path method uit het ding van regel 2 om naar de juiste map te verwijzen. __dirname is the current absolute path, en die koppelen we aan de map waar we de bundel in willen hebben: dist/js
        filename: 'js/bundle.js'   // standaardnaam. Webpack zet dit zelf in een <script> in het html-bestand dat hieronder in de plugin wordt gemaakt
    }, 
    devServer: {
        contentBase: './dist',    // de map met bestanden die we via de server willen monitoren tijdens het programmeren (maw het eindproduct)
    },
    plugins: [
        new HtmlWebpackPlugin({     // we willen de src-html kopiëren naar de distmap en er automatisch het juiste script source bestand in laten gooien
            filename: 'index.html',         // doelbestand, wordt hier gemaakt 
            template: './src/index.html'      // bronbestand. Sommige apps hebben dit niet eens maar laten hem genereren door webpack...
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,      // 'zoek naar alle bestanden die eindigen$ op .js'
                exclude: /node_modules/,    // 'dwz alle .js-bestanden behalve die in de node_modules'. Soort .gitignore
                use: {
                    loader: 'babel-loader'      // deze deed het om een of andere reden alleen als babel-loader@7, niet in een andere versie
                }
            }
        ]
    }
}   // entry, output, loaders en plugins zijn de 4 noodzakelijke onderdelen van de webpackconfiguratie
// ook nodig: webpack toevoegen als apart script in de package.json zodat ie dit ding gaat zoeken en doet wat de bedoeling is
// ook nodig: installeren van het pakket waarmee je daadwerkelijk iets met webpack kunt doen...: webpack-cli --save-dev (want het is een devtool dat je in je package.json vermeld wilt hebben)

// na output en voor de loaders en plugins hadden we nog mode: 'development' om snel code te verwerken terwijl je bezig bent met bouwen, terwijl andere optie production voor het grondige, uiteindelijke proces is met minifying en weet ik wat meer om het te uploaden pakket zo klein mogelijk te houden
// maar het is makkelijker om mode niet hier te zetten maar in het npm script in de package.json zodat je het niet op het eind hoeft te veranderen

// als je het start script runt, krijg je de output van die plugin niet te zien, veranderingen worden rechtstreeks doorgegeven aan de server. Pas met dev (of build) worden de bundle.js en index.html in de distmap daadwerkelijk gemaakt
