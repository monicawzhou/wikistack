const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const { userList, userPages } = require('../views');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));

  } catch (error) {next(error)}
});

