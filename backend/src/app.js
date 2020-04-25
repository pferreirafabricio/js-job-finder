const express = require('express');
const app = express();
const path = require('path');

const db = require(path.resolve(__dirname, 'db/connection'));

const portApp = 3000;

app.listen(portApp, () => {
    console.log(`The app is listening on port ${portApp}`);
});

db.authenticate()
    .then(() => {
        console.log('Connected to DataBase!');
    })
    .catch((error) => {
        console.error(`Something goes wrong in DataBase connection process: ${error}`);
    });

app.get('/', (request, response) => {
    response.send(`I'm getting the users shit!`);
});