// Imports
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Variables
const db = require(path.resolve(__dirname, 'db/connection'));
const portApp = 3000;

app.listen(portApp, () => {
    console.log(`The app is listening on port ${portApp}`);
});

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

db.authenticate()
    .then(() => {
        console.log('Connected to DataBase!');
    })
    .catch((error) => {
        console.error(`Something goes wrong in DataBase connection process: ${error}`);
    });

app.get('/', (req, res) => {

  let search = req.query.job;
  let query =  `%${search}%`;

  if (!search) {
    Job.findAll({ order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render('index', { jobs });
    })
    .catch(error => {
      console.log(`An error occurs: ${error}`);
    })
  } else {
    Job.findAll({ 
      where: { title: { [Op.like]: query }},
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(jobs => {
      res.render('index', { jobs, search });
    })
    .catch(error => {
      console.log(`An error occurs: ${error}`);
    })
  }
});

app.use('/jobs', require('./routes/jobs'));