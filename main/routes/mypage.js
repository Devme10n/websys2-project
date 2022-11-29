//찜목록
//찜목록 조회
router.get('/pick/list', async (req, res, next) => {});
//찜목록 삭제
router.get('/pick/list/delete/:id', async (req, res, next) => {});

//구매기록
//구매기록 조회
router.get('/orders', async (req, res, next) => {});
//구매기록 삭제
//질문:delete 사용 가능 여부
router.get('/order/delete/:id', async (req, res, next) => {});
///get 배송 조회-/mypage/order
router.get('/order/:id', async (req, res, next) => {});

//물품 교환 페이지 폼
//질문:exchange라고 써도 되는가? RESTful한가? → exchangeItem
router.get('/order/:id/exchange/form', async (req, res, next) => {});
//물품 교환
router.post('/order/:id/exchange', async (req, res, next) => {});

//환불 페이지 폼
// RESTful한가?
router.get('/order/:id/refund/form', async (req, res, next) => {});
//환불
router.post('/order/:id/refund', async (req, res, next) => {});

//1대1 문의 리스트
router.get('/inquiry/list', async (req, res, next) => {});
//1대1 문의 폼
router.get('/inquiry/form', async (req, res, next) => {});
//1대1 문의
router.post('/inquiry/:id', async (req, res, next) => {});