const Sequelize = require('sequelize');

module.exports = class Pick extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            productId: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                defaultValue: null
            },
            preferred: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Pick',
        tableName: 'picks',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Pick.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Pick.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
    }
};
