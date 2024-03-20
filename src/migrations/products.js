module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      price: {
        allowNull: true,
        type: Sequelize.INTEGER(10),
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
    await queryInterface.dropTable('products')
  },
}
