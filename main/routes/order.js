const router = require("./goods");

// get 결제 페이지
/**
req: req.params.id =>로그인 된 사용자의 id
res:: 로그인한 사용자의 carts 객체
 */
router.get('/checkout', async (req, res, next) => {});

//포인트 결제
/**
req: req.params.id =>로그인 된 사용자의 id
res: 포인트 결제 성공/실패
 */
router.post('/parchase/point', async (req, res, next) => {});
//카드 결제
/**
req: req.params.id =>로그인 된 사용자의 id
res: 카드 결제 성공/실패
 */
router.post('/parchase/card', async (req, res, next) => {});

//포인트 선물 post
/**
req: req.params.id =>로그인 된 사용자의 id
res: 포인트 선물 결제 성공/실패
 */
router.post('/parchase/present/point', async (req, res, next) => {});
//카드 선물 post
/**
req: req.params.id =>로그인 된 사용자의 id
res: 카드 선물 결제 성공/실패
 */
router.post('/parchase/present/card', async (req, res, next) => {});


/**
결제 페이지 폼
 */
//포인트 결제 방법 폼
router.get('/parchase/point/form', async (req, res, next) => {});
//카드 결제 방법 폼
router.get('/parchase/card/form', async (req, res, next) => {});