'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('chat',{
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
      },
      msgs: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          },
  });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('chat');
  }
};
