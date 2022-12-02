const express = require('express');
const bcrypt = require('bcrypt')
const Goods = require('../models/goods');

const router = express.Router();

//get 물품 조회
router.get('/product/:id', async (req, res, next) => {
    try {
        //product에서 product id로 가져오기
        const product = await Product.findOne({
            where: { productId: req.params.id }
        });
        res.json(product);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//get 세트 조회
router.get('/package/:id', async (req, res, next) => {
    try {
        //product에서 product id로 가져오기
        const package = await Package.findOne({
            where: { packageid: req.params.id }
        });
        res.json(package);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//질문:장바구니 라우터에 있어야 하는가? 물품 라우터에 있어야 하는가?
//post 물품 장바구니 등록 
router.post('/product/carts', async (req, res, next) => {
    const userId = req.user.id;
    const { productId, count } = req.body; // 

    const cartProduct = await Carts.findOne({ where: { productId } }); // DB 이름
    if (cartProduct) { // 이미 장바구니에 들어간 상품이면 장바구니에 하나 더 넣기
        count: count+1;
        next();
        return;
    }
    try {
        await Carts.create({ // DB 이름
            userId,
            productId
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//post 세트 장바구니 등록 
/** 
req: req.user
res: post success, res.render(/package/:id)
body: req.user.id, req.body.id, req.body.count
 */
router.post('/package/carts', async (req, res, next) => {
    const userId = req.user.id;
    const { packageId, count } = req.body; // 

    const cartPackage = await Carts.findOne({ where: { packageId } }); // DB 이름
    if (cartPackage) { // 이미 장바구니에 들어간 상품이면 장바구니에 하나 더 넣기
        count: count+1;
        next();
        return;
    }

    try {
        await Carts.create({ // DB 이름
            userId,
            packageId
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//post 물품 찜목록 등록 
router.post('/product/pick', async (req, res, next) => {
    const userId = req.user.id;
    const { productId } = req.body; 
    try {
        await Pick.create({ // DB 이름
            userId,
            productId
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//post 세트 찜목록 등록 
router.post('/package/pick', async (req, res, next) => {
    const userId = req.user.id;
    const { packageId } = req.body; // 
    try {
        await Pick.create({ // DB 이름
            userId,
            packageId
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//리뷰
//질문: 외부 리뷰 어떻게 처리할 지
//선택한 물품 리뷰 전체 조회
router.get('/product/:id/reviews',async(req, res, next) => {
    try {
        //굿즈 아이디로 연관된 review 가져오기
        const goods = await Goods.findOne({
            where: { id: req.params.id }
        });

        if (goods) {
            const reviews = await goods.getReviews();
            res.json(reviews);
        } else
            next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//작성 폼
router.get('/product/:id/review/form',async(req, res, next) => {});
router.get('/package/:id/review/form',async(req, res, next) => {});
//post 작성/수정
router.post('/product/review',async(req, res, next) => {
        const { productId, title, rate, description, imgUrls } = req.body;
        const userId = req.user.id;

        try {
            await Review.create({ userId, productId, title, rate, description, imgUrls });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
});
router.post('/package/reviews',async(req, res, next) => {
    const { packageId, title, rate, description, imgUrls } = req.body;
    const userId = req.user.id;

    try {
        await Review.create({ userId, packageId, title, rate, description, imgUrls });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
