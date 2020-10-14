/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

class MenuBar {
  constructor(selector) {
    this.selector = selector;
    this.appState = null;
  }

  importState(state) {
    this.appState = state;
  }

  createHtml() {
    // state.currentMonth:현재 날짜 (YYYY-MM)
    return `
    <ul>
    <li>
      <a href="#main"><div class="menu-history">내역</div></a>
    </li>
    <li>
      <a href="#calendar"><div class="menu-calender">달력</div></a>
    </li>
    <li>
      <a href="#statistics"><div class="menu-stastics">통계</div></a>
    </li>
  </ul>
      `;
  }

  render(selector = this.selector) {
    const htmlStr = this.createHtml();
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
  }
}
export default MenuBar;
