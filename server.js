const path = require('path');
const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tech_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});


const hbs = exphbs.create({
    defaultLayout: 'nav',
    extname: '.handlebars',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views'),
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => 
    console.log('Now listening on PORT:', PORT)
    )
});