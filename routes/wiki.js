const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send('/wiki');
});

router.post('/', async (req, res, next) => {
  const page = new Page(req.body);
  console.log(page);
  const user = new User(req.body);
  console.log(user);

  try {
    await page.save();
    await user.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
