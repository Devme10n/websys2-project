const express = require('express');
const {  Users, Coupon  } = require('../models');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

//쿠폰
    
// 쿠폰 폼을 가져오면서 post
router.route('/')
    .get(isLoggedIn, (req, res) => {
        res.status(200).json({"result": "success", "message": "쿠폰 폼입니다."});
    })
    .post( isLoggedIn, async (req, res, next) => {
        const userId = req.user.id;
        const {  couponId, used } = req.body;
        try {
            const createCoupon = await Coupon.create({  
                userId: userId, 
                couponId,
                used
            });
            if (createCoupon) res.status(200).json({"result": "success", "message": "쿠폰 등록 완료"});
            else next(res.status(400).json({"result": "fail", "error": "쿠폰 등록 실패" }))
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

//보유한 쿠폰 조회
router.get('/myCoupons',isLoggedIn,  async (req, res, next) => {
    try {
        const couponList = await Coupon.findAll({
            where: { userId: req.user.id }
        });
        if (couponList) res.status(200).json({"result": "success", "couponList": couponList});
        else next(res.status(400).json({"result": "fail", "error": '계정을 찾지 못했습니다.' }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});


//전체 쿠폰 리스트
router.get('/list', async (req, res, next) => {
    try{
        const couponList = await Coupon.findAll({
        });

        if (couponList) res.json({"result": "success", "message": couponList});
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;