const path = require('path');

const express = require('express');
const Cart = require('../models/carts');
const { Product, Order } = require('../models');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

// 내 장바구니 전체조회
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const myCarts = await Cart.findAll({
            where: { userId: req.user.id },
            include: { 
                model: Product,
            }
        });
        
        if (myCarts) { res.json(myCarts); } 
        else next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 장바구니에서 장바구니 id로 삭제
router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Cart.destroy({
            where: { id: req.params.id }
        });

        if (result) res.json({"result": "success", "message": "삭제되었습니다."});
        else next({"result": "fail", "error": "장바구니에 물품이 존재하지 않습니다."})
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 나의 장바구니에 물품 등록
router.post('/product', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const { productId } = req.body
    const productInfo = await Product.findOne({
        where: { id: req.body.productId }
    })
    try {     
        const result = await Cart.create({
            userId: userId,
            productId: req.body.productId,
        });
        if(result) res.status(200).json({"result": "success", "message": "cart 등록이 완료되었습니다."});
        else next({"result": "fail", "error": "물품이 존재하지 않습니다."})
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 장바구니 물품들을 주문
router.post('/order', isLoggedIn, async (req,res,next)=>{
    const { receiverAddress }= req.body

    const myCarts = await Cart.findAll({
        where: { userId: req.user.id },
        include: {
            model: Product,
        }
    });

    for (i = 0; i < myCarts.length; i++) {
        const totalPrice = myCarts[i]['Product'].price * (100 - myCarts[i]['Product'].discount) / 100
        try {
            const result = await Order.create({
                userId: req.user.id,
                productId: myCarts[i]['Product'].id,
                receiverAddress: req.body.receiverAddress,
                totalPrice: totalPrice
            });
            if (result) res.status(200).json({"result": "success", "message": "주문이  완료되었습니다."});
            else res.status(404).json({"result": "fail", "message": "주문이  실패하였습니다."});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

module.exports = router;
