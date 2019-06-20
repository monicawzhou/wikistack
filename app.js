const morgan = require('morgan');
const express = require('express');
const { db, Page, User } = require('./models');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');
const main = require('./views/main');

const app = express();
app.use(express.urlencoded({ extended: false }));

const layout = require('./views/layout');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);

app.get('/', async (req, res) => {

  let page = await Page.findAll();

  res.send(main(page));
  // res.send(layout(''));
});


db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await db.sync();

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
