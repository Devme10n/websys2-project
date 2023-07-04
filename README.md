# websys2-project
: 쇼핑몰 API 설계 프로젝트

### [REST API 명세서](https://documenter.getpostman.com/view/24114901/2s93sc4YLZ)

### 핵심코드

#### 다대다 테이블 제거

User 테이블과 Product 테이블을 연결하는 관계를 다대다 관계가 아닌 일대다,다대 일로 변경하여 테이블을 작성함

    static associate(db) {
        db.Review.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Review.belongsTo(db.Product, { foreignKey: 'productId', targetKey: 'id' });
    }



#### 사용자 인증 시스템
<details>
<summary>API 요청과 데이터베이스 액세스를 제한하기 위해서 세션과 passport를 사용하여 안전한 사용자 인증 시스템 구현</summary>
<div markdown="1">
    
passport를 모듈화하여 사용중
    const passport = require('passport');
    const local = require('./local');
    const kakao = require('./kakao');
    const User = require('../models/user');

    module.exports = () => {
          passport.serializeUser((user, done) => {
            done(null, user.id);
          });

    passport.deserializeUser((id, done) => {
        User.findOne({
          where: { id }
        })
        .then(user => done(null, user))
        .catch(err => done(err));
      });

      local();
      kakao();
    };


</div>
</details>



### ERD

![ERD](https://github.com/max990624/websys2-project/assets/39523433/5bc03a96-d00d-4139-9365-653b66037773)


### 깃 커밋 규칙

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X)
- chore : 빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)
- design : CSS 등 사용자 UI 디자인 변경
- comment : 필요한 주석 추가 및 변경
- rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- remove : 파일을 삭제하는 작업만 수행한 경우
- !BREAKING CHANGE : 커다란 API 변경의 경우
- !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우
