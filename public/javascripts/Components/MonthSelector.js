/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

class MonthSelector {
  constructor(selector) {
    this.selector = selector;
    this.appState = null;
  }

  importState(state) {
    this.appState = state;
  }

  static getMonthStr(date) {
    let now = null;
    if (date) now = new Date(date);
    else now = new Date();
    const currentMonthStr = [now.getFullYear(), `0${now.getMonth() + 1}`.slice(-2)].join('-');
    return currentMonthStr;
  }

  createHtml(state) {
    // state.currentMonth:현재 날짜 (YYYY-MM)
    return `
        <button class="next-month-btn">▲</button>
        <h1 class="current-month">${state.currentMonth}</h1>
        <button class="prev-month-btn">▼</button>
    `;
  }

  render(selector = this.selector) {
    const state = { ...this.appState.state };
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.setMonthUpDownHandler();
  }

  setMonthUpDownHandler() {
    const nextMonthBtn = document.querySelector('.next-month-btn');
    const prevMonthBtn = document.querySelector('.prev-month-btn');

    const monthClickChangeHandler = async (ev) => {
      const state = this.appState.get();
      const targetClassName = ev.target.className;
      const currentDate = new Date(state.currentMonth);
      targetClassName === 'next-month-btn' ? currentDate.setMonth(currentDate.getMonth() + 1) : currentDate.setMonth(currentDate.getMonth() - 1);
      const currentMonthStr = MonthSelector.getMonthStr(currentDate);
      //     const recordlist = await this.appState.loadMonthAccountHistory(currentMonthStr);

      await this.appState.changeMonthState(currentMonthStr);

      this.render(this.selector);
    };

    nextMonthBtn.addEventListener('click', monthClickChangeHandler);
    prevMonthBtn.addEventListener('click', monthClickChangeHandler);
  }
}
export default MonthSelector;
