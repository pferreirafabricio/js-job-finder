const express = require('express');
const app = express();
let portApp = 3000;

app.get('/', (request, response) => {
    response.send(`I'm getting the users shit!`);
});

app.listen(portApp);
console.log(`The app is listening in port ${portApp}`);