const Sequelize = require('sequelize');
const User = require('./user');
const Product = require('./prodcut');
const Package = require('./package');
const Category = require('./category');
const Review = require('./review');
const Order = require('./order');
const Cart = require('./cart');
const Inquiry = require('./inquiry');
const Pick = require('./pick');
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
db.Package = Package;
db.Category = Category;
db.Review = Review;
db.Order = Order;
db.Cart = Cart;
db.Inquiry = Inquiry;
db.Pick = Pick;
db.Coupon = Coupon;

User.init(sequelize);
Product.init(sequelize);
Package.init(sequelize);
Category.init(sequelize);
Review.init(sequelize);
Order.init(sequelize);
Cart.init(sequelize);
Inquiry.init(sequelize);
Package.init(sequelize);
Coupon.init(sequelize);

User.associate(db);
Product.associate(db);
Package.associate(db);
Category.associate(db);
Review.associate(db);
Order.associate(db);
Cart.associate(db);
Inquiry.associate(db);
Package.associate(db);
Coupon.associate(db);

module.exports = db;