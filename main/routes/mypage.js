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
    .post(async (req, res, next) => {
        const { mypage } = req.body;
        const userId = req.user.id;
        try {
            await Mypage.create({ userId, mypage });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });


//찜 목록 조회
/** 
req: req.params.id 로그인된 아이디
res: 로그인된 유저의 pick 객체
 */
router.get('/pick', async (req, res, next) => {
});
//찜 목록 삭제
/** 
req: req.params.id
res: 로그인된 유저의 pick의 goods=:id 인 물품 삭제
 */
router.get('/pick/delete/:id', async (req, res, next) => {
    try {
        const result = await Pick.destroy({
            where: { id: req.params.id }
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
res:: 로그인된 유저의 구매기록 조회
##################################################################
order가 purchase로 바뀌다면 어떤식으로 처리 해야할까?
##################################################################
 */
router.get('/orders', async (req, res, next) => {});
//구매 기록 삭제
router.get('/order/delete/:id', async (req, res, next) => {
    try {
        //orders 아이디로 검색해서 Orders에서 삭제
        const result = await Orders.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});
///get 배송 조회-/mypage/order
/**
req: req.goods.id (로그인된 유저가 주문할 상품 id)
res: 로그인 된 유저가 주문한 물품의 배송 상태
 */
router.get('/order/:id', async (req, res, next) => {});

//물품 교환 페이지 폼
router.get('/exchange/:id/form', async (req, res, next) => {});
//물품 교환
/**
####################################################################
물품의 배송상태는 어디서 어떻게 처리하는게 좋을까요?
구현을 어떤식으로 해야할지 잘 모르겠습니다!
####################################################################
req: 배송 전인 물품의 id, 변경할 물품의 id
res: 물품이 배송 전이라면  교환 (200)/ 물품이 배송 중이라면 실패()
body: 배송상태의 변경
 */
router.post('/exchange/:id', async (req, res, next) => {});

//환불 페이지 폼
// RESTful한가?
router.get('/refund/:id/form', async (req, res, next) => {});
//환불
/** :id 는 goods 상품 번호
body: 변경된 상품 번호
*/
router.post('/refund/:id', async (req, res, next) => {});

//1대1 문의 리스트

router.get('/inquiry/list', async (req, res, next) => {});
//1대1 문의 폼
router.get('/inquiry/form', async (req, res, next) => {});
//1대1 문의 조회
/**
req: req.goods.id
res: 로그인된 아이디가 문의한 goods.id의 1대1 문의 기록
*/
router.post('/inquiry/:id', async (req, res, next) => {});

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
//리뷰 조회
router.get('/review/:id', async (req, res, next) => {});
//리뷰 작성 폼
router.get('/review/form', async (req, res, next) => {});
//리뷰 작성/업데이트 post
router.post('/review/:id', async (req, res, next) => {});
//리뷰 삭제
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