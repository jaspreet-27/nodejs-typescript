module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authentications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      userId: {
        allowNull: true,
        type: Sequelize.STRING(36),
      },
      authToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      expiresIn: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      deletedBy: {
        type: Sequelize.STRING(36),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authentications')
  },
}
