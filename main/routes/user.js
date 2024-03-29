const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user');

const { isLoggedIn } = require('./helpers');
const { Order } = require('../models');

const router = express.Router();

// 회원가입
router.post('/', async (req, res, next) => {
    const { id, password, name, phonenumber } = req.body;
    if (!password) return next('비밀번호를 입력하세요.');

    const user = await User.findOne({ where: { id } });
    if (user) {
        next(res.status(409).json({"result": "fail", "error": "이미 등록된 회원입니다."}));
        return;
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id,
            password: hash,
            name,
            phonenumber
        });
        res.status(200).json({"result": "success", "meesage": "회원 가입이 완료되었습니다."})
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// 회원 정보 수정
router.post('/update',isLoggedIn, async (req, res, next) => {
    try {
        const result = await User.update({
            phonenumber: req.body.phonenumber
        }, {
            where: { id: req.user.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "회원 정보가 업데이트 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '계정을 찾지 못했습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 회원 탈퇴
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "회원 정보가 삭제 되었습니다."});
        else next(res.status(400).json({"result": "fail", "error": '회원 계정이 존재하지 않습니다.' }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 아이디 찾기
router.get('/findId', async (req, res, next) => {
    const { name, phonenumber } = req.query;
    try {
        const user = await User.findOne({ where: { name, phonenumber } });
        if (user) {
            res.status(200).json({"result": "success", "userId": user.id});
        } else {
            res.status(409).json({"result": "fail", "error": '계정을 찾지 못했습니다.' });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// 회원 정보 조회
router.get('/:id',isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        if (user) res.status(200).json({"result": "success", "userInfo": user});
        else next(res.status(400).json({"result": "fail", "error": '계정을 찾지 못했습니다.' }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 물품 교환
router.route('/productExchangeOrRefund')
    .get(isLoggedIn, async (req, res) => {
        const productId = req.query.productId
        const result = await Order.findOne({
            where: { productId: productId }
        })
        res.status(200).json({result, "result": "success", "message": "물품 교환 작성 폼입니다."});
    })
    .post(isLoggedIn, async (req, res, next) => {
        const { productId, orderState, orderStateDescription }= req.body
    try {
        const result = await Order.update({
            orderState: orderState,
            orderStateDescription: orderStateDescription
        }, {
            where: { id: req.user.id }
        });

        if (result) res.status(200).json({"result": "success", "message": "회원 정보가 업데이트 되었습니다."});
        else next(res.status(409).json({"result": "fail", "error": '계정을 찾지 못했습니다.' }));
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;