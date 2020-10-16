/* eslint-disable import/extensions */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

import { getLoginToken, setAuthXAuthHeader } from '../lib/Transaction.js';

class LoginForm {
  constructor(selector) {
    this.selector = selector;
    this.appState = null;
    this.getLoginToken = getLoginToken;
  }

  importState(state) {
    this.appState = state;
  }

  createHtml() {
    // state.currentMonth:현재 날짜 (YYYY-MM)
    return `
  <div class="login-form card" >
  <div class="header">서비스를 이용하려면 로그인이 필요합니다</div>
  <div><span>ID</span><input type="text" name="userid" id="userid"></div>
  <div><span>PW</span><input type="password" name="pw" id="pw" ></div>
  <button class="login-btn">로그인</button>
  <hr>
  <div><a href="#signup">회원가입</a></div>
  </div>
        `;
  }

  bindEvents() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', (ev) => this.loginBtnClickEvHandler(ev));
  }

  async loginBtnClickEvHandler(ev) {
    const userid = document.querySelector('#userid').value;
    const pw = document.querySelector('#pw').value;
    const loginData = {
      userid,
      pw,
    };

    const authData = await getLoginToken(loginData);
    sessionStorage.setItem('userid', authData.user.userid);
    sessionStorage.setItem('authtoken', authData.token);
    setAuthXAuthHeader();

    location.hash = 'main';
  }

  render(selector = this.selector) {
    const htmlStr = this.createHtml();
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();
  }
}
export default LoginForm;
