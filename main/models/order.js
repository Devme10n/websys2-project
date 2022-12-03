const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
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
            },
            sender: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            senderAddress: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            receiver: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            receiverAddress: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            totalPrice: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        db.Order.belongsTo(db.Package, { foreignKey: 'packageId', targetKey: 'id' });
    }
};
