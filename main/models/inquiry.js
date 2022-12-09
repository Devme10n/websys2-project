const Sequelize = require('sequelize');

module.exports = class Inquiry extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            title: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Inquiry',
        tableName: 'inquirys',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Inquiry.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};
