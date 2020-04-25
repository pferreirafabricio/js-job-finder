const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/get', (req, res) => {
  console.log(`Jobs routers`);
});

router.post('/add', (req, res) => {
    let { title, salary, company, description, email, new_job } = req.body;

    Job.create({
      title,
      salary,
      company,
      description,
      email,
      new_job
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;