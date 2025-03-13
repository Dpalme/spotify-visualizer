const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const spotifyClient = require('./src/spotifyClient.js');

app.set('trust proxy', 1);
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.use(express.json());
app.use(express.static('public'));

app.engine('.hbs', exphbs({
  extname: '.hbs'
}))
app.set('view engine', '.hbs');

app.use(spotifyClient);

const listener = app.listen(process.env.PORT, ()=> {
  console.log('App listening on port ' + listener.address().port);
})