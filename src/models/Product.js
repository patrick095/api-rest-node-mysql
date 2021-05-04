const { Sequelize, Model, DataTypes } = require('sequelize');
const dbConfig = require('../database');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Product = sequelize.define('products',{
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      createdAt: DataTypes.DATE
}, {
  tableName: 'products'
})
// COMANDO PARA CRIAR A TABELA CASO NÃO EXISTA
// Product.sync({force: true}).then(()=>{
//   return Product.create({
//     title: "novo produto 1",
//     description: "Esse é um novo produto",
//     url:"http://localhost:300/products",
//     createdAt: Date.now()
//   })
// })

module.exports = Product;