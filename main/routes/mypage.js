const path = require('path');

const express = require('express');
const Comment = require('../models/mypage');

const { isLoggedIn } = require('./helpers');


const router = express.Router();

router.route('/')
    .get(isLoggedIn, (req, res) => {
        res.locals.title = require('../package.json').name;
        res.locals.userId = req.user.id;
        res.render('mypage');
    })

//찜 목록 조회
/** 
req: req.params.id 로그인된 아이디
res: 로그인된 유저의 pick 객체
 */
router.get('/pick', async (req, res, next) => {
    try {
        //product에서 product id로 가져오기
        const pick = await Pick.findAll({        
            where: { userId: req.user.id }
        });
        res.json(pick);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//찜 목록 삭제
/** 
req: req.params.id
res: 로그인된 유저의 pick의 goods=:id 인 물품 삭제
 */
router.get('/pick/delete/product/:id', async (req, res, next) => {
    try {
        const result = await Pick.destroy({
            where: { productId: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//세트 찜 목록 삭제
router.get('/pick/delete/package/:id', async (req, res, next) => {
    try {
        const result = await Pick.destroy({
            where: { packageId: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//구매 기록
//구매 기록 조회
/**
req:: req.params.id
res:: 로그인된 유저의 주문기록 전체 조회
 */
router.get('/orders', async (req, res, next) => {
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
req: req.goods.id (로그인된 유저가 주문할 상품 id)
res: 로그인 된 유저가 주문한 물품의 배송 상태
 */
router.get('/order/:id', async (req, res, next) => {
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
router.get('/order/delete/:id', async (req, res, next) => {
    try {
        //order id로 검색해서 Order에서 삭제
        const result = await Orders.destroy({
            where: { orderId: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//물품 교환 페이지 폼
router.get('/exchange/:id/form', async (req, res, next) => {

});
//물품 교환
/**
req: 배송 전인 물품의 id, 변경할 물품의 id
res: 물품이 배송 전이라면  교환 (200)/ 물품이 배송 중이라면 실패()
body: 배송상태의 변경
 */
router.post('/exchange', async (req, res, next) => {
    try {
        const orderId = req.user.id;
        const result = await Order.update({ state: req.body.state}, 
        {
            where: { id: req.body.id }
        });

        if (result) res.redirect('/');
        else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//환불 페이지 폼
// RESTful한가?
router.get('/refund/:id/form', async (req, res, next) => {});
//환불
/** :id 는 goods 상품 번호
body: 변경된 상품 번호
*/
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

//1대1 문의 전체 조회
router.get('/inquiry', async (req, res, next) => {
    try {
        //product에서 product id로 가져오기
        const inquiry = await Inquiry.findAll({
            attributes: ['id','userId','title','description']
        });
        res.json(inquiry);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//1대1 문의 폼
router.get('/inquiry/form', async (req, res, next) => {});
//1대1 문의 작성
/**
req: req.goods.id
res: 로그인된 아이디가 문의한 goods.id의 1대1 문의 기록
*/
router.post('/inquiry', async (req, res, next) => {
    const { id, password, name, description } = req.body;
});

//리뷰 기록

//get 리뷰 전체 조회
/*
리뷰 조회 api
http method: GET
request:
response:
body: 
*/
router.get('/review', async (req, res, next) => {});
//내가 작성한 리뷰 조회
router.get('/review/:id', async (req, res, next) => {});
//리뷰 작성 폼
router.get('/review/form', async (req, res, next) => {});
//내가 장성한 리뷰 작성 post
router.post('/review', async (req, res, next) => {});
//내가 작성한 리뷰 update
router.post('/review/update', async (req, res, next) => {});
//내가 작성한 리뷰 리뷰 삭제
router.get('/review/delete/:id', async (req, res, next) => {});

//쿠폰

//쿠폰 조회
router.get('/coupon', async (req, res, next) => {});
//쿠폰 등록
router.post('/coupon', async (req, res, next) => {});
//쿠폰 폼
router.get('/coupon/form', async (req, res, next) => {});
//쿠폰 리스트
router.get('/coupon/list', async (req, res, next) => {});