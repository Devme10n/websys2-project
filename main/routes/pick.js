const express = require('express');
const Pick = require('../models/pick');
const { Product, Package } = require('../models');

const router = express.Router();

// 찜 전체 조회
router.get('/', async(req, res, next) => {
    try {
        const picklist = await Pick.findAll({
            where: { userId: req.user.id },
            include: [
            {
                model: Product
            },
            {
                model: Package
            }]
        });
         res.json(picklist);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// product 찜 등록
router.post('/product', async (req, res, next) => {
    const userId = req.user.id;
    const { id, productId, preferred } = req.body
    const pick = await Pick.findOne({
        where: { userId, productId },
        attributes: [ 'preferred' ]
     });

    if (pick != null) { // update가 안됨
        const updatedpreferred = !pick.dataValues.preferred //[질문] 이렇게 해도 되요?
        try {
            const result = await Pick.update({
                preferred: updatedpreferred
            }, {
                where: {
                    userId: req.user.id,
                    productId: req.body.productId
                }
            });
    
            if (result) res.status(200).send("찜 상태가 변경되었습니다.");
            else next('Not updated!')
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    else {
        try {
            await Pick.create({
                id,
                userId: userId,
                productId,
                preferred
            });
    
            res.status(200).send("찜 등록이 완료되었습니다.");;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

// package 찜 등록
router.post('/package', async (req, res, next) => {
    const userId = req.user.id;
    const { id, packageId, preferred } = req.body
    const pick = await Pick.findOne({
        where: { userId, packageId },
        attributes: [ 'preferred' ]
     });

    if (pick != null) { // update가 안됨
        const updatedpreferred = !pick.dataValues.preferred //[질문] 이렇게 해도 되요?
        try {
            const result = await Pick.update({
                preferred: updatedpreferred
            }, {
                where: {
                    userId: req.user.id,
                    packageId: req.body.packageId
                }
            });
    
            if (result) res.status(200).send("찜 상태가 변경되었습니다.");
            else next('Not updated!')
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    else {
        try {
            await Pick.create({
                id,
                userId: userId,
                packageId,
                preferred
            });
    
            res.status(200).send("찜 등록이 완료되었습니다.");;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

module.exports = router;