const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
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
            title: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            },
            rate: {
                type: Sequelize.SMALLINT,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            },
            imgUrls: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null                
            }
        }, {
        sequelize,
        timestamps: false,
        modelName: 'Review',
        tableName: 'reviews',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Review.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Review.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
        db.Review.belongsTo(db.Package, { foreignKey: 'packageId', targetKey: 'id' });
    }
};
