const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            productId: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                defaultValue: null
            },
            receiverAddress: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            totalPrice: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            orderState: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            },
            orderStateDescription: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            }
        }, {
        sequelize,
        timestamps: true,
        modelName: 'Order',
        tableName: 'orders',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Order.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Order.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
    }
};
