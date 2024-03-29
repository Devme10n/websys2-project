const Sequelize = require('sequelize');

module.exports = class Coupon extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            couponId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            used: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Coupon',
        tableName: 'coupons',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Coupon.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};
