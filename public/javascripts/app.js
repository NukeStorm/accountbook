/* eslint-disable import/extensions */
import MainView from './View/main.js';
import CalendarView from './View/calendar.js';
import StatisticView from './View/statistic.js';
import LoginView from './View/login.js';
import SignupForm from './View/signup.js';
import { checkAuthToken, setAuthXAuthHeader } from './lib/Transaction.js';

// 주소-해당 화면  View 객체 맵핑
const viewList = {
  main: new MainView(),
  calendar: new CalendarView(),
  statistics: new StatisticView(),
  login: new LoginView(),
  signup: new SignupForm(),
};

// SPA 초기화
async function init() {
  window.onload = async () => {
    // url 입력되어 페이지 로드할때 해당 주소의 화면으로 바로 초기화, 없는 주소면 메인페이지 로드
    let targetView = window.location.hash.replace('#', '');
    if (!viewList[targetView]) targetView = 'login';

    if (checkAuthToken()) setAuthXAuthHeader();
    await viewList[targetView].render();
  };

  // url hash 기반 라우팅
  window.addEventListener('hashchange', async () => {
    // hash가 변경되면 이벤트 발생 및 라우팅 처리
    let targetView = window.location.hash.replace('#', '');
    if (targetView !== 'login' && targetView !== 'signup' && !checkAuthToken()) {
      alert('로그인을 먼저 해주세요');
      targetView = 'login';
    }

    // 해당 해쉬에 해당하는 View 렌더링
    await viewList[targetView].render();
  });
}

init();
