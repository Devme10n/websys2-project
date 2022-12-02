//찜 목록
//찜 목록 조회
router.get('/pick/list', async (req, res, next) => {});
//찜 목록 삭제
router.get('/pick/list/delete/:id', async (req, res, next) => {});

//구매 기록
//구매 기록 조회
router.get('/orders', async (req, res, next) => {});
//구매 기록 삭제
//질문:delete 사용 가능 여부
router.get('/order/delete/:id', async (req, res, next) => {});
///get 배송 조회-/mypage/order
router.get('/order/:id', async (req, res, next) => {});

//물품 교환 페이지 폼
//질문:exchange라고 써도 되는가? RESTful한가? → exchangeItem
router.get('/exchange/:id/form', async (req, res, next) => {});
//물품 교환
router.post('/exchange/:id', async (req, res, next) => {});

//환불 페이지 폼
// RESTful한가?
router.get('/refund/:id/form', async (req, res, next) => {});
//환불
router.post('/refund/:id', async (req, res, next) => {});

//1대1 문의 리스트
router.get('/inquiry/list', async (req, res, next) => {});
//1대1 문의 폼
router.get('/inquiry/form', async (req, res, next) => {});
//1대1 문의 조회
router.post('/inquiry/:id', async (req, res, next) => {});

//리뷰 기록

//get 리뷰 전체 조회
/*
리뷰 조회 api
http method: GET
request:
response:
body: 
*/
router.get('/review', async (req, res, next) => {});
//리뷰 조회
router.get('/review/:id', async (req, res, next) => {});
//리뷰 작성 폼
router.get('/review/form', async (req, res, next) => {});
//리뷰 작성/업데이트 post
router.post('/review/:id', async (req, res, next) => {});
//리뷰 삭제
router.get('/review/delete/:id', async (req, res, next) => {});

//쿠폰

//쿠폰 조회
router.get('/coupon', async (req, res, next) => {});
//쿠폰 등록
router.post('/coupon', async (req, res, next) => {});
//쿠폰 폼
router.get('/coupon/form', async (req, res, next) => {});
//쿠폰 리스트
router.get('/coupon/list', async (req, res, next) => {});