const express = require('express');
const { Product,  Review } = require('../models');

const router = express.Router();


// 물품 조회
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


// 할인 상품 목록 조회
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


// 선택한 물품 리뷰 전체 조회
router.get('/:id/reviews',async(req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        });

        if (product) {
            const reviews = await product.getReviews();
            res.json(reviews);
        } else
            next(`There is no product with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 물품의 리뷰 작성 폼
router.get('/:id/review/form',async(req, res, next) => {
    try {
        const product = await Review.findOne({
            where: { id: req.params.id }
        });

        if (product) {
            res.status(200).json({"result": "success", "message": "product 리뷰 작성 폼입니다."});
        } else
            next(`There is no product with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 물품의 리뷰 작성
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

module.exports = router;