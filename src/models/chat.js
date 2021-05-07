const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) =>{
    const Chat = sequelize.define('chat',{
          msgs: DataTypes.ARRAY(Sequelize.TEXT),
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,
    }, {
      tableName: 'chat'
    })
    return Chat;
  }