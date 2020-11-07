

### 로그인
![로그인](https://user-images.githubusercontent.com/22471977/96086507-6d685180-0efd-11eb-9367-ba81cbb2b8ac.gif)
### 회원가입
![회원가입](https://user-images.githubusercontent.com/22471977/96087226-7e659280-0efe-11eb-9415-ddb0a335962a.gif)
### 가계부 기록 추가 
![추가](https://user-images.githubusercontent.com/22471977/96086514-6e997e80-0efd-11eb-8b60-3be8fbc0b170.gif)
### 가계부 기록 삭제
![삭제](https://user-images.githubusercontent.com/22471977/96086516-6f321500-0efd-11eb-9799-4c44de32bc38.gif)
### 가계부 기록 수정 
![수정](https://user-images.githubusercontent.com/22471977/96086518-6fcaab80-0efd-11eb-986b-11fbff04581d.gif)
### 월간 수입/지출 달력 
![달력](https://user-images.githubusercontent.com/22471977/96086523-6fcaab80-0efd-11eb-98e0-8cfea74d8681.gif)
### 월 지출 통계
![월통계](https://user-images.githubusercontent.com/22471977/96086524-70634200-0efd-11eb-9f73-27eb3dcca49b.gif)


### 프로젝트구조(FE)
![디렉토리구조](https://user-images.githubusercontent.com/22471977/96087489-e4eab080-0efe-11eb-9d14-203c621c362c.PNG)


## 주요 구현내용 FE
- SPA방식으로 구현
- 데이터(모델)과  뷰를 최대한 분리하려고 노력
- Observer pattern을 활용하여 구현
- 모델(State)가 변경되면 이를 관찰하고 있는 모든 Observer(컴포넌트) 렌더링
- Subject Class : Observer를 등록하고 Observer가 관찰하고 있는 대상이 변경되면 이를 알림
- 해당 View의 State를 관리하는 State Class가 Subject를 상속받아 State가 변경되면 이를 등록된 Observer들에게 알림
  -데이터를 관리하는 Model에 해당
- /state의 여러 State클래스들
  -State를 상속받아 각 View별로 필요한 State 변경 관련 함수 구현
- /Component 의 컴포넌트 클래스들
  - 화면을 여러 컴포넌트로 나누어 구현 - Component로 공통 메소드를 묶어서 추상화 시켜야 했으나 그렇게 하지 못함
  - 대부분의 컴포넌트가 Observer 클래스를 상속받아 State를 관찰
  - State가 등록된 모든 Observer의 update()를 실행시키고 컴포넌트에서 오버라이딩되어 재정의된 render() 함수를 통해 자신을 렌더링
- View Class :  화면을 나타내는 Class로 여러 컴포넌트를 입력받아 화면을 구성할 수 있도록 구현
  -  /View 디렉토리의 Class들이 View 를 상속받아 각 화면을 구현
- app.js : SPA의 시작점에 해당하며 SPA의 화면을 구성하는 View를 생성하여 화면을 주소에 맞게 해당 View로 렌더링한다.
- uri hash fragment를 활용하여 라우팅을 구현
## 주요 구현내용 BE
- Express.js기반
- ORM Sequelize 사용
- Passport + jwt 사용하여 회원인증 구현
- 토큰인증 미들웨어를 구현하여 로그인된 사용자만 Content(가계부기록)관련 rest api 사용 가능하게끔 구현
## 하지못한것
- 통계부분의 일일 지출 그래프를 구현하지 못했다.
- Payment(결제수단) 관련 기능을 구현하지 못했다.
- 프론트엔드에서 jwt 토큰 만료후 백엔드에서 발생시키는 에러를 예외처리하고 토큰을 재발급받는 프로세스를 구현하지 못했다


