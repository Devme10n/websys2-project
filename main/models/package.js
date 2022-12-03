const Sequelize = require('sequelize');

module.exports = class Package extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                primaryKey: true
            },
            productId1: {
                type: Sequelize.SMALLINT,
                allowNull: false,
            },
            productId2: {
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
        // db.Package.hasMany(db.Review, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        // db.Package.hasMany(db.Order, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        // db.Package.hasMany(db.Cart, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        // db.Package.hasMany(db.Pick, { foreignKey: 'pacakgeId', sourceKey: 'id' });
        db.Package.belongsTo(db.Product, { foreignKey: 'productId1', sourceKey: 'id' });
        db.Package.belongsTo(db.Product, { foreignKey: 'productId2', sourceKey: 'id' });
        /** 
         * 1. alias 별명 주고 각기 include하기 
         * 출처: https://velog.io/@yzkim9501/sequelize-%ED%95%9C%EA%B0%9C%EC%9D%98-%EB%AA%A8%EB%8D%B8%EC%97%90-%EB%98%91%EA%B0%99%EC%9D%80-%EB%AA%A8%EB%8D%B8%EC%9D%84-%EB%91%90%EB%B2%88-join%EC%8B%9C%ED%82%A4%EA%B3%A0-%EC%8B%B6%EC%9D%84-%EB%95%8C
         * 2. packageId 따로 주기 
         * */
    }
};