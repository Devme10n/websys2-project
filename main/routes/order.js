const router = require("./goods");

// get 결제 페이지
router.get('/checkout', async (req, res, next) => {});

// 선물하기 페이지
router.get('/present/checkout', async (req, res, next) => {});

//질문: 포인트/카드 결제 전략

//포인트 결제 방법 폼
router.get('/parchase/point/form', async (req, res, next) => {});

//포인트 결제 방법 post
router.post('/parchase/point', async (req, res, next) => {});
//포인트 선물 결제 방법 post
router.post('/parchase/present/point', async (req, res, next) => {});

//카드 결제 방법 폼
//질문: 카드사 별로 전략을 사용하고 싶음
router.get('/parchase/card/form', async (req, res, next) => {});

//카드 결제 방법
router.post('/parchase/card', async (req, res, next) => {});
//카드 선물 결제 방법
router.post('/parchase/present/card', async (req, res, next) => {});