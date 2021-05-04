const { DataTypes } = require('sequelize');
const dbConfig = require('../database');
const sequelize = require('../database')

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