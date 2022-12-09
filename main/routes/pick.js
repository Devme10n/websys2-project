const express = require('express');
const Pick = require('../models/pick');
const { Product, Category } = require('../models');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

// 찜 목록 전체 조회
router.get('/', isLoggedIn ,async(req, res, next) => {
    try {
        const pickList = await Pick.findAll({
            where: { userId: req.user.id, preferred: true },
            include: [{
                model: Product,
                include: [{
                    model: Category,
                    attributes: [ "name" ]
                }]
            }]
        });
        if (pickList) res.status(200).json({"result": "success", "pickList": pickList});
        else next(res.status(400).json({"result": "fail", "error": '사용자 계정을 찾지 못했습니다.' }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 찜 목록 등록/수정
router.post('/product', isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const { productId, preferred } = req.body
    const pick = await Pick.findOne({
        where: { userId, productId },
        attributes: [ 'preferred' ]
     });

    if (pick != null) {
        const updatedpreferred = !pick.dataValues.preferred
        try {
            const result = await Pick.update({
                preferred: updatedpreferred
            }, {
                where: {
                    userId: req.user.id,
                    productId: req.body.productId
                }
            });
            if (result) res.status(200).json({"result": "success", "message": "찜 상태가 변경되었습니다."});
            else next(res.status(400).json({"result": "fail", "error": '찜 상태 변경 실패' }))
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    else {
        try {
            await Pick.create({
                userId: userId,
                productId,
                preferred
            });
            res.status(200).json({"result": "success", "message": "찜 등록이 완료되었습니다."});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

module.exports = router;