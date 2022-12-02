// get 물품 검색
/**
Query string: type=name=(검색어)
req: req.params.id
res: 검색어로 검색된 객체
 */
router.get('/result?type=name=(검색어)', async (req, res, next) => {});
// get 카테고리 검색
/**
Query string: category=name=(검색어)
req: req.params.id
res: 검색어로 검색된 객체
 */
router.get('/result?type=category=(검색어)', async (req, res, next) => {});