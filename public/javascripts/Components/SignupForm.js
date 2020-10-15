/* eslint-disable import/extensions */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import { signup } from '../lib/Transaction.js';

class SignupForm {
  constructor(selector) {
    this.selector = selector;
    this.appState = null;
    this.signup = signup;
  }

  importState(state) {
    this.appState = state;
  }

  createHtml() {
    // state.currentMonth:현재 날짜 (YYYY-MM)
    return `
  <div class="signup-form card" >
  <div class="header">회원가입</div>
  <div><span>ID</span><input type="text" name="userid" id="userid"></div>
  <div><span>PW</span><input type="password" name="pw" id="pw" ></div>
  <hr>
  <div class="btn-area">
  <button class="signup-btn">회원가입</button> <button class="signup-cancel-btn">취소</button>
 </div>

  </div>
        `;
  }

  bindEvents() {
    const loginBtn = document.querySelector('.signup-btn');
    loginBtn.addEventListener('click', (ev) => this.signUpBtnClickEvHandler(ev));
    const cancelBtn = document.querySelector('.signup-cancel-btn');
    cancelBtn.addEventListener('click', (ev) => this.cancleBtnClickEvHandler(ev));
  }

  async signUpBtnClickEvHandler(ev) {
    const userid = document.querySelector('#userid').value;
    const pw = document.querySelector('#pw').value;
    const newUserData = {
      userid,
      pw,
    };

    const res = await this.signup(newUserData);
    if (res) {
      alert('회원가입되었습니다');
      location.hash = 'login';
    } else {
      alert('회원가입에 실패했습니다');
    }
  }

  async cancleBtnClickEvHandler(ev) {
    location.hash = 'login';
  }

  render(selector = this.selector) {
    const htmlStr = this.createHtml();
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();
  }
}
export default SignupForm;
