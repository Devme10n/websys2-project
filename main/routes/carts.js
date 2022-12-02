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
router.get('/', async (req, res, next) => {

});

// #################################################################
// have to add?
// #################################################################
//장바구니 하나 조회
/** 
req: req.user.id, req.params.id
res: 장바구니 품목 하나, res.locals.cart = {} //객체
 */
router.get('/:id', async (req, res, next) => {
    try {
        const cart = await Carts.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'description'] // 장바구니에 들어가는 내용들
        });
        res.json(cart);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//삭제
/** 
req: req.user.id, req.params.id
res: delete 여부
 */
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await Carts.destroy({
            where: { id: req.params.id }
        });

        if (result) res.redirect('/'); // ?
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//물건 개수 변경 update
/** 
req: req.user.id, req.params.id
res: update 여부
body: req.body.물건 개수(?)
 */
router.post('/update/:id', async (req, res, next) => {
    try {
        const result = await Carts.update({
            description: req.body.description // description -> 물건 개수(count?)
        }, {
            where: { id: req.params.id }
        });

        if (result) res.redirect('/');
        else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
