    const Sequelize = require('sequelize');
    const User = require('./user');
    const Product = require('./product');
    const Category = require('./category');
    const Review = require('./review');
    const Order = require('./order');
    const Cart = require('./carts');
    const Inquiry = require('./inquiry');
    const wishList = require('./wishList');
    const Coupon = require('./coupon');

    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};

    const sequelize = new Sequelize(
        config.database, config.username, config.password, config
    );

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.User = User;
    db.Product = Product;
    db.Category = Category;
    db.Review = Review;
    db.Order = Order;
    db.Cart = Cart;
    db.Inquiry = Inquiry;
    db.wishList = wishList;
    db.Coupon = Coupon;

    User.init(sequelize);
    Product.init(sequelize);
    Category.init(sequelize);
    Review.init(sequelize);
    Order.init(sequelize);
    Cart.init(sequelize);
    Inquiry.init(sequelize);
    wishList.init(sequelize);
    Coupon.init(sequelize);

    User.associate(db);
    Product.associate(db);
    Category.associate(db);
    Review.associate(db);
    Order.associate(db);
    Cart.associate(db);
    Inquiry.associate(db);
    wishList.associate(db);
    Coupon.associate(db);

    module.exports = db;