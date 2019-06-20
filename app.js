const morgan = require ('morgan');
const express = require('express');
const {db, Page, User} = require('./models');

const app = express();
app.use(express.urlencoded({ extended: false}));

const layout = require('./views/layout');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(layout(""));
});

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  await db.sync({force: true});


  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();

