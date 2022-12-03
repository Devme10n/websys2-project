const Sequelize = require('sequelize');

module.exports = class Package extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                primaryKey: true
            },
            productId: {
                type: Sequelize.SMALLINT,
                allowNull: false,
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            discount: {
                type: Sequelize.SMALLINT,
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
        modelName: 'Package',
        tableName: 'packages',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Package.hasMany(db.Review, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        db.Package.hasMany(db.Order, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        db.Package.hasMany(db.Cart, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        db.Package.hasMany(db.Pick, { foreignKey: 'pacakgeId', sourceKey: 'id' });
    }
};
