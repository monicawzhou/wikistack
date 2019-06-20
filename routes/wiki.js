const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const { addPage } = require('../views');
const  wikipage = require('../views/wikipage');

router.get('/', (req, res, next) => {
  res.redirect('../');
});

router.post('/', async (req, res, next) => {
  try {

    const [user, wasCreated] = await User.findOrCreate( {
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });
    console.log("USERRRR", user);
    console.log("wasCreatedddd", wasCreated);

    const page = await Page.create(req.body);
    page.setAuthor(user);


    await page.save();
    await user.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne( {
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikipage(page, page.name));

  } catch (error) { next(error)}

});

module.exports = router;
