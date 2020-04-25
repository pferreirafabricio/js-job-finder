const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const db = require(path.resolve(__dirname, 'db/connection'));
const portApp = 3000;

app.listen(portApp, () => {
    console.log(`The app is listening on port ${portApp}`);
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate()
    .then(() => {
        console.log('Connected to DataBase!');
    })
    .catch((error) => {
        console.error(`Something goes wrong in DataBase connection process: ${error}`);
    });

app.get('/', (req, res) => {
  res.send('Rota inicial');
});

app.use('/jobs', require('./routes/jobs'));