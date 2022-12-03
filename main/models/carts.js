const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            productId: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                defaultValue: null
            },
            packageId: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Cart',
        tableName: 'carts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Cart.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Cart.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
        db.Cart.belongsTo(db.Package, { foreignKey: 'packageId', targetKey: 'id' });
    }
};
