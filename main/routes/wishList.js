const express = require('express');
const wishList = require('../models/wishList');
const { Product, Category } = require('../models');

const router = express.Router();

// 찜 전체 조회
router.get('/', async(req, res, next) => {
    try {
        const wishList = await wishList.findAll({
            where: { 
                userId: req.user.id,
                preferred: true
            },
            include: [{
                model: Product,
            }]
        });
        if (wishList) res.status(200).json({"result": "success", "wishList": wishList});
        else next(res.status(400).json({"result": "fail", "error": '계정을 찾지 못했습니다.' }))
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// product 찜 등록
router.post('/product', async (req, res, next) => {
    const userId = req.user.id;
    const { productId, preferred } = req.body
    const wishList = await wishList.findOne({
        where: { userId, productId },
        attributes: [ 'preferred' ]
     });

    if (wishList != null) { 
        const updatedpreferred = !wishList.dataValues.preferred 
        try {
            const result = await wishList.update({
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
            await wishList.create({
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