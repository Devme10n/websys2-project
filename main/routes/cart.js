const path = require('path');

const express = require('express');
const Cart = require('../models/cart');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

<<<<<<< HEAD
// 장바구니 전체조회
router.get('/carts', async (req, res, next) => {});

// 장바구니 물품 삭제
// get 대신에 delete 쓰면 안되나?
router.get('/carts/:id', async (req, res, next) => {});

// 장바구니 물품 개수 변경
router.post('/carts/:id', async (req, res, next) => {});
=======
router.route('/')
    .get(isLoggedIn, (req, res) => {
        res.locals.title = require('../package.json').name;
        res.locals.userId = req.user.id;
        res.render('cart');
    })
    .post(async (req, res, next) => {
        const { cart } = req.body;
        const userId = req.user.id;

        try {
            await Cart.create({ userId, cart });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

//장바구니 전체 조회
router.get('/', async (req, res, next) => {});

//삭제
router.get('/delete/:id', async (req, res, next) => {});

//물건 개수 변경 update
router.post('/update/:id', async (req, res, next) => {});
>>>>>>> bc

module.exports = router;
