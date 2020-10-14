/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

import { convertNumberFormat } from '../lib/utils.js';
import { getCategoryList, addAccountHistory } from '../lib/Transaction.js';

class ContentAddForm {
  constructor(selector) {
    this.appState = null;
    this.selector = selector;
    this.getCategoryList = getCategoryList;
    this.addAccountHistory = addAccountHistory;
  }

  importState(state) {
    this.appState = state;
  }

  createHtml(state) {
    let typeNodeHtmlStr = '';
    state.categoryTypeList.forEach((type) => {
      typeNodeHtmlStr += `<button class="category-type-toggle" id="${`typeid-${type.typeid}`}">${type.name}</button>`;
    });

    let categoryNodeHtmlStr = '';
    state.categoryList.forEach((category) => {
      categoryNodeHtmlStr += `<option value="${category.cid}">${category.content}</option>`;
    });

    return `
      <div class="row" style="display: flex; justify-content: space-between">
        <div class="row category-type">${typeNodeHtmlStr}</div>
        <div class="row form-btns-list">
          <button>내용 지우기</button>
        </div>
      </div>
      <div class="row">
        <label for="date">날짜</label>
        <input type="date" name="date" />
        <label for="category">카테고리</label>
        <select name="category">
          <option value="">선택하기</option>
          ${categoryNodeHtmlStr}
        </select>
        <label for="payment">결제수단</label>
        <select name="payment">
          <option value="test">test</option>
        </select>
      </div>
      <div class="row">
        <label for="amount">금액</label>
        <input id="amount" type="text" name="amount" />
        <label for="content">내용</label>
        <input type="text" name="content" />
      </div>
      <div class="row">
        <button class="add-btn">추가</button>
      </div>
      `;
  }

  async typeToggleHandler(ev) {
    const state = this.appState.get();
    const selected = ev.target;

    const typeId = parseInt(selected.id.split('-')[1]);
    const categoryList = await this.getCategoryList(typeId);
    this.appState.update({
      ...state,
      categoryList,
    });
    this.render(this.selector);

    document.querySelector(`#${selected.id}`).classList.add('selected');
  }

  amountInputCheckHandler(ev) {
    const moneyinput = ev.target;
    let moneystr = moneyinput.value;
    moneystr = moneystr.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    moneystr = moneystr.replace(/,/g, ''); // ,값 공백처리
    const num = Number(moneystr);
    document.querySelector('#amount').value = convertNumberFormat(num);
  }

  // eslint-disable-next-line no-unused-vars
  async addBtnEvnetListner(ev) {
    const state = this.appState.get();
    const userid = 'test';
    const date = document.querySelector('input[name="date"]').value;
    const category = parseInt(document.querySelector('select[name="category"]').value);
    // const payment = document.querySelector('select[name="payment"]').value;
    const amount = parseInt(document.querySelector('input[name="amount"]').value.replace(/,/gi, ''));
    const content = document.querySelector('input[name="content"]').value;

    if (!(userid && date && category && amount && content)) return;

    const history = {
      date,
      category,
      amount,
      content,
      userid,
    };
    const result = await this.addAccountHistory(history);
    if (result) {
      alert('입력되었습니다');
      const recordlist = await this.appState.loadMonthAccountHistory(this.appState.get().currentMonth);
      this.appState.update({
        ...state,
        recordlist,
      });
    } else {
      alert('오류');
    }
  }

  bindEvents() {
    const CategoryTypeBtns = document.querySelector('.row .category-type').childNodes;
    CategoryTypeBtns.forEach((btn) => {
      btn.addEventListener('click', (ev) => this.typeToggleHandler(ev));
    });
    const moneyinput = document.querySelector('#amount');
    moneyinput.addEventListener('keyup', (ev) => this.amountInputCheckHandler(ev));
    const addbtn = document.querySelector('.add-btn');
    addbtn.addEventListener('click', (ev) => {
      this.addBtnEvnetListner(ev);
    });

    document.querySelector(this.selector).addEventListener('click', (ev) => {
      const userid = 'test';
      const date = document.querySelector('input[name="date"]').value;
      const category = parseInt(document.querySelector('select[name="category"]').value);
      // const payment = document.querySelector('select[name="payment"]').value;
      const amount = parseInt(document.querySelector('input[name="amount"]').value.replace(/,/gi, ''));
      const content = document.querySelector('input[name="content"]').value;

      if (userid && date && category && amount && content) document.querySelector('.add-btn').disabled = false;
      else document.querySelector('.add-btn').disabled = true;
    });
  }

  render(selector = this.selector) {
    const state = { ...this.appState.state };
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    const currentDateStr = `${state.currentMonth}-${`0${new Date().getDate()}`.slice(-2)}`;
    document.querySelector('input[name="date"]').value = currentDateStr;
    document.querySelector('.add-btn').disabled = true;
    this.bindEvents();
  }
}
export default ContentAddForm;
