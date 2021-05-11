//var mysql = require('mysql');
const Sequelize = require('sequelize');
var dev = require('./config.json');
var env = dev.development;

const sequelize = new Sequelize(
  env.database, env.db_username, env.db_password, 
  {
    host: env.host,
    dialect: env.db_dialect,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync({ force: false })
    .then(() => {
     console.log(`Database & tables created here!`)
    }).catch(err => {
      console.error('Unable to sync:', err);
    });

module.exports = sequelize;