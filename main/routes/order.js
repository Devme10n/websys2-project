const express = require('express');
const { Order, Cart, Product } = require('../models');

const { isLoggedIn } = require('./helpers');

const router = express.Router();


router.get('/myOrders',isLoggedIn, async (req, res, next) => {
    try {
        //Order에서 userid로 가져오기
        const orders = await Order.findAll({
            where: { userId: req.user.id }
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

///get 주문 조회-/mypage/order
/**
req: req.product.id (로그인된 유저가 주문할 상품 id)
res: 로그인 된 유저가 주문한 물품의 배송 상태
 */
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


//구매 기록 삭제
router.get('/delete/:id',isLoggedIn, async (req, res, next) => {
    try {
        //order id로 검색해서 Order에서 삭제
        const result = await Order.destroy({
            where: { Id: req.params.id }
        });

        if (result) res.json("주문 기록이 삭제되었습니다.");
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});






module.exports = router;