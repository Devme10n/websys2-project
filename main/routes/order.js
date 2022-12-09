const express = require('express');
const { Order, Cart, Product } = require('../models');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

// 내 주문 전체 기록 조회
router.get('/myOrders',isLoggedIn, async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id }
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 물품 주문 기록 조회
router.get('/:id',isLoggedIn, async (req, res, next) => {
    try {
        //Order에서 orderid로 가져오기
        const order = await Order.findAll({
            where: { id: req.params.id }
        });
        res.json(order);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// 주문 기록 삭제
router.get('/delete/:id',isLoggedIn, async (req, res, next) => {
    try {
        //order id로 검색해서 Order에서 삭제
        const result = await Order.destroy({
            where: { Id: req.params.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "주문 기록이 삭제 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '주문 기록을 찾을 수 없습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});






module.exports = router;