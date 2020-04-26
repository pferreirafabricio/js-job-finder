const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/get', (req, res) => {
  console.log(`Jobs routers`);
});

router.get('/add', (req, res) => {
  res.render('add');
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

router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: {id: req.params.id}
  })
  .then(job => {
    res.render('job', { job });
  })
  .catch(error => {
    console.log(`An error occurs in getting the job ${req.params.id}: ${error}`);
  })
});

module.exports = router;