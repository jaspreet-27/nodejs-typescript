module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(30),
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER(3),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(30),
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('users')
  },
}
