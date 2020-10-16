/* eslint-disable import/extensions */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

import { setAuthXAuthHeader } from '../lib/Transaction.js';

class NavBar {
  constructor(selector) {
    this.selector = selector;
    this.appState = null;
  }

  importState(state) {
    this.appState = state;
  }

  createHtml() {
    const userid = sessionStorage.getItem('userid');
    const userAreaHtml = userid ? `<div class="user-area">ID:${userid}<button id="logout-btn">로그아웃</button></div>` : '';
    // state.currentMonth:현재 날짜 (YYYY-MM)
    return `
        <div class="nav-bar"><div class="nav-title">가계부</div>${userAreaHtml}</div>
        `;
  }

  bindEvents() {
    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', (ev) => this.logoutBtnClickEvHandler(ev));
  }

  async logoutBtnClickEvHandler(ev) {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('authtoken');
    setAuthXAuthHeader();
    alert('로그아웃되었습니다.');
    location.hash = 'login';
  }

  render(selector = this.selector) {
    const htmlStr = this.createHtml();
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();
  }
}
export default NavBar;
