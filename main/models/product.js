const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                primaryKey: true
            },
            categoryId: {
                type: Sequelize.SMALLINT,
                allowNull: false,
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            discount: {
                type: Sequelize.SMALLINT,
                allowNull: true,
                defaultValue: null
            },
            imgUrls: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null                
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false               
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Product',
        tableName: 'products',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Product.hasMany(db.Review, { foreignKey: 'productId', sourceKey: 'id' });
        db.Product.hasMany(db.Order, { foreignKey: 'productId', sourceKey: 'id' });
        db.Product.hasMany(db.Cart, { foreignKey: 'productId', sourceKey: 'id' });
        db.Product.hasMany(db.WishList, { foreignKey: 'productId', sourceKey: 'id' });
        db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', targetKey: 'id' });
    }
};
