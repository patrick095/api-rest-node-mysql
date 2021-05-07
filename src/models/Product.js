module.exports = (sequelize, DataTypes) =>{
  const Product = sequelize.define('products',{
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        url: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
  }, {
    tableName: 'products'
  })
  return Product;
}
