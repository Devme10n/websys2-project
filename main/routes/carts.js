const path = require('path');

const express = require('express');
const Carts = require('../models/carts');

const { isLoggedIn } = require('./helpers');


const router = express.Router();
/** 
Carts DB
userId  foreignKey
goodsId foreignKey
물건 개수   int
 */

//장바구니 전체 조회
/** 
req: req.user.id
res: 장바구니 목록, res.locals.carts = {} // 리스트? 객체?
 */
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const user = await Cart.findAll({
            where: { id: req.user.id }
        });

        if (user) {
            const cart = await user.getCarts();
            res.json(cart);
        } else
            next(`There is no cart with ${req.user.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//삭제
/** 
req: goods.id
res:
 */
router.get('/delete/:id', async (req, res, next) => {
    try {
        //Carts 객체에서 Goods id로 삭제
        const result = await Carts.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//물건 개수 변경 update
/** 
req: 
res: 
body:
###########################################################
물품 갯수에 대해서 count를 사용하는게 편할까요?
없다면 변경하려는 물품 개수가 기존보다 많거나 적은것에 따라서 전략을 사용해서
구현해보고 싶습니다.
DB 물품 관리 어떤식으로 하는게 좋을까요?
###########################################################
 */
router.post('/update/:id', async (req, res, next) => {
    try {
        //carts 객체에서 검색한 물품의 개수를 변경함
        const result = await Carts.update({
            description: req.body.description
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
