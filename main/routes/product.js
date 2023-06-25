const express = require('express');
const { Product,  Review } = require('../models');

const router = express.Router();


//get 물품 조회
router.get('/:id', async (req, res, next) => {
    try {
        //product에서 product id로 가져오기
        const product = await Product.findOne({
            where: { id: req.params.id }
        });
        res.json(product);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// 할인상품 목록 조회
router.get('/', async (req, res, next) => {
    try {
        const discountProductList = await Product.findAll({
            where: { discount: req.query.discount }
        });
        res.json(discountProductList)
    } catch (err) {
        console.error(err);
        next(err);
    }
});


//리뷰
//작성 폼
router.get('/:id/review/form',async(req, res, next) => {
    try {
        const result = await Review.findOne({
            where: { id: req.params.id }
        });

        if (result) {
            res.status(200).json({"result": "success", "message": "product 리뷰 작성 폼입니다."});
        } else
            next(`There is no product with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//리뷰 작성
router.post('/review', async(req, res, next) => {
    const userId = req.user.id;
    const { productId, title, rate, description, imgUrls } = req.body;
    try {
        const createReview = await Review.create({  
            userId: userId, 
            productId, 
            title, 
            rate, 
            description, 
            imgUrls });
        if (createReview) res.status(200).json({"result": "success", "message": "리뷰 작성 완료"});
        else next(res.status(400).json({"result": "fail", "error": "리뷰 작성 실패" }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});


//선택한 물품 리뷰 전체 조회
router.get('/:id/reviews',async(req, res, next) => {
    try {
        const result = await Product.findOne({
            where: { id: req.params.id }
        });

        if (result) {
            const reviews = await result.getReviews();
            res.json(reviews);
        } else
            next(`There is no product with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});




//물품 교환 페이지 폼
router.get('/exchange/:id/form', async (req, res, next) => {

});
//물품 교환
router.post('/exchange', async (req, res, next) => {
    try {
        const orderId = req.user.id;
        const result = await Order.update({
             state: req.body.state}, 
        {
            where: { id: req.body.id }
        });

        if (result) {
            res.status(200).json({"result": "성공적으로 교환됬습니다."});
    } else{
        res.status(409).json({"result":"fail"});
    }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//환불 페이지 폼
router.get('/refund/:id/form', async (req, res, next) => {});
//환불
router.post('/refund', async (req, res, next) => {
    try {
        const result = await Order.update({
            state: req.body.state
        }, {
            where: { id: req.body.id }
        });

        if (result) res.redirect('/');
        else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;