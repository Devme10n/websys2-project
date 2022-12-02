const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Category',
        tableName: 'categorys',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Category.hasMany(db.Product, { foreignKey: 'categoryId', sourceKey: 'id' });
    }
};
