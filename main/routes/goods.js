const express = require('express');
const bcrypt = require('bcrypt')
const Goods = require('../models/goods');

const router = express.Router();
/** 
product DB
id
~~~
 */

/** 
package DB
id
firstProductId foreignKey -> product.id // 첫번째 productId 라고 쓰고 싶은데 이렇게 쓰는게 맞나?
secondProductId
thirdProductId
 */

//get 물품 조회
/** 
req: req.params.id
res: 찾은 물품 객체
 */
router.get('/product/:id', async (req, res, next) => {
    try {
        const product = await Goods.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'description'] // product 내용
        });
        res.json(product);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//get 세트 조회
/** 
req: req.params.id
res: 찾은 패키지 물품 객체
 */
router.get('/package/:id', async (req, res, next) => {
    try {
        const package = await Carts.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'description'] // package 내용 -> product 내용 다 불러와야함 // 이중으로 db안에 외래키로 찾을라면 where문 두번 쳐야하나?
        });
        res.json(package);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/** 
비회원인 경우 // 얘를 처리를 어떻게 하지?
    장바구니에 추가
    req.user = null;
회원인 경우
    req.user = 사용자 정보 // 교수님 코드 확인해보기!
 */

//post 물품 장바구니 등록 
/** 
req: req.params.id, req.user
res: post success, res.render(/product/:id)
body: req.user.id, req.body.productId, req.body.count
 */
router.post('/product/:id/carts', async (req, res, next) => {
    const { productId, count } = req.body;

    const cartProduct = await Carts.findOne({ where: { productId } }); // DB 이름
    if (cartProduct) { // 이미 장바구니에 들어간 상품이면 장바구니에 하나 더 넣기
        count: count+1;
        next();
        return;
    }

    try {
        await Carts.create({ // DB 이름
            id,
            count
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
//post 세트 장바구니 등록 
/** 
req: req.params.id, req.user
res: post success, res.render(/package/:id)
body: req.user.id, req.body.id, req.body.count
 */
router.post('/package/:id/carts', async (req, res, next) => {
    const { id, count } = req.body; // 

    const cartPackage = await Carts.findOne({ where: { id } }); // DB 이름
    if (cartPackage) { // 이미 장바구니에 들어간 상품이면 장바구니에 하나 더 넣기
        count: count+1;
        next();
        return;
    }

    try {
        await Carts.create({ // DB 이름
            id,
            count
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//post 물품 찜목록 등록 
/** 
req: req.params.id, req.user
res: post success, res.render(/product/:id)
body: req.user.id, req.body.id, req.body.prefer
 */
router.post('/product/:id/pick', async (req, res, next) => {});
//post 세트 찜목록 등록 
/** 
req: req.params.id, req.user
res: post success, res.render(/package/:id)
body: req.user.id, req.body.id, req.body.prefer
 */
router.post('/package/:id/pick', async (req, res, next) => {});

//리뷰
//질문: 외부 리뷰 어떻게 처리할 지
//리뷰 조회
/** 
req: req.params.id
res: res.render(/product/:id/reviews)
 */
router.get('/product/:id/reviews',async(req, res, next) => {});
//작성 폼
/** 
req: req.params.id
res: res.render(/product/:id/reviews/form)
 */
router.get('/product/:id/reviews/form',async(req, res, next) => {});
/** 
req: req.params.id
res: res.render(/package/:id/reviews/form)
 */
router.get('/package/:id/reviews/form',async(req, res, next) => {});
//post 작성/수정
/** 
req: req.params.id
res: 
body: description
 */
router.post('/product/:id/reviews',async(req, res, next) => {

});
/** 
req: req.params.id
res: 
body: 
 */
router.post('/package/:id/reviews',async(req, res, next) => {});

module.exports = router;
