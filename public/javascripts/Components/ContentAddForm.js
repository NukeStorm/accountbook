/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

import { convertNumberFormat } from '../lib/utils.js';
import { getCategoryList, addAccountHistory, modifyAccountHistory } from '../lib/Transaction.js';

class ContentAddForm {
  constructor(selector) {
    this.appState = null;
    this.selector = selector;
    this.getCategoryList = getCategoryList;
    this.addAccountHistory = addAccountHistory;
    this.modifyAccountHistory = modifyAccountHistory;
    this.categoryList = [];
  }

  importState(state) {
    this.appState = state;
  }

  createCategoryListHtml() {
    let categoryNodeHtmlStr = '';
    this.categoryList.forEach((category) => {
      categoryNodeHtmlStr += `<option value="${category.cid}">${category.content}</option>`;
    });
    return categoryNodeHtmlStr;
  }

  createHtml(state) {
    let typeNodeHtmlStr = '';
    state.categoryTypeList.forEach((type) => {
      typeNodeHtmlStr += `<button class="category-type-toggle" id="${`typeid-${type.typeid}`}">${type.name}</button>`;
    });

    const categoryNodeHtmlStr = this.createCategoryListHtml();

    return `
      <div class="row" style="display: flex; justify-content: space-between">
        <div class="row category-type">${typeNodeHtmlStr}</div>
        <div class="row form-btns-list">
          <button class="reset-btn">내용 지우기</button>
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
        <button class="add-btn" id="submit-btn">추가</button>
      </div>
      `;
  }

  async typeToggleHandler(ev) {
    // const state = this.appState.get();
    const selected = ev.target;
    const typeId = parseInt(selected.id.split('-')[1]);
    this.categoryList = await this.getCategoryList(typeId);

    const btnlist = document.querySelectorAll('.category-type-toggle');
    btnlist.forEach((btn) => {
      if (btn.id === selected.id) {
        btn.classList.add('selected');
      } else btn.classList.remove('selected');
    });

    // document.querySelector(`#${selected.id}`).classList.add('selected');
    document.querySelector('select[name="category"]').innerHTML = this.createCategoryListHtml();
  }

  amountInputCheckHandler(ev) {
    const moneyinput = ev.target;
    let moneystr = moneyinput.value;
    moneystr = moneystr.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    moneystr = moneystr.replace(/,/g, ''); // ,값 공백처리
    const num = Number(moneystr);
    document.querySelector('#amount').value = convertNumberFormat(num);
  }

  formResetBtnEvHnadler(ev) {
    const addForm = document.querySelector('#content-add-form');
    const currentDateStr = `${this.appState.state.currentMonth}-${`0${new Date().getDate()}`.slice(-2)}`;
    addForm.querySelector("input[name='date']").value = currentDateStr;
    addForm.querySelector("input[name='amount']").value = '';
    addForm.querySelector("input[name='content']").value = '';
    addForm.querySelector("select[name='category']").value = '';
  }

  // eslint-disable-next-line no-unused-vars
  async submitBtnEvHandler(ev) {
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
    const resultmsg = {
      modify: '수정되었습니다.',
      add: '입력되었습니다.',
    };

    let msg = null;
    let result = null;
    if (ev.target.classList.contains('modify')) {
      history.idx = document.querySelector(this.selector).getAttribute('row-id');
      result = await this.modifyAccountHistory(history);
      msg = resultmsg.modify;
      ev.target.classList.remove('modify');
    } else {
      result = await this.addAccountHistory(history);
      msg = resultmsg.add;
    }

    if (result) {
      alert(msg);
      const recordlist = await this.appState.loadMonthAccountHistory(this.appState.get().currentMonth);
      this.appState.update({
        ...state,
        recordlist,
      });
    } else {
      alert('오류');
    }
  }

  modifyCancleBtnClickEvHandler(ev) {
    const formResetBtn = document.querySelector('.reset-btn');
    formResetBtn.click(); // 수정취소시 폼 내용 삭제
    const cancelBtn = ev.target;
    const parent = cancelBtn.parentNode;
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.classList.remove('modify');
    submitBtn.innerText = '추가';
    parent.removeChild(cancelBtn);
  }

  addModifyCancelBtn() {
    const btnArea = document.querySelector('.form-btns-list');
    const cancelBtnHtml = '<button class="modify-cancel-btn">수정 취소하기</button>';
    btnArea.insertAdjacentHTML('beforeend', cancelBtnHtml);

    const cancleBtn = document.querySelector('.modify-cancel-btn');
    cancleBtn.addEventListener('click', (ev) => this.modifyCancleBtnClickEvHandler(ev));
  }

  async changeToModifyForm() {
    const { recordMap } = this.appState.state;
    const idx = parseInt(document.querySelector(this.selector).getAttribute('row-id'));
    const history = recordMap.get(idx);
    const typeid = history.Category.type;
    this.categoryList = await this.getCategoryList(typeid);
    const btnlist = document.querySelectorAll('.category-type-toggle');
    btnlist.forEach((btn) => {
      if (btn.id === `typeid-${typeid}`) {
        btn.classList.add('selected');
      } else btn.classList.remove('selected');
    });
    document.querySelector('select[name="category"]').innerHTML = this.createCategoryListHtml();
    const addForm = document.querySelector('#content-add-form');
    addForm.querySelector("input[name='date']").value = history.date;
    addForm.querySelector("input[name='amount']").value = history.amount;
    addForm.querySelector("input[name='content']").value = history.content;
    addForm.querySelector("select[name='category']").value = history.Category.cid;
    addForm.querySelector('#submit-btn').innerText = '수정';

    this.addModifyCancelBtn();
  }

  // submit 버튼 class가 변경될때 처리하는 콜백 함수
  async btnClassChangeCallback(mutationsList, observer) {
    mutationsList.forEach(async (mutation) => {
      if (mutation.attributeName === 'class') {
        //  버튼 class가 modify(수정) 일때
        if (mutation.target.classList.contains('modify')) {
          this.changeToModifyForm();

          // 입력 폼을 수정 폼으로 변경, 수정할 기록 데이터를 바인딩
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // 버튼 class에 modify가 없을때(수정모드가 아닌 일반 추가모드)
        }
      }
    });
  }

  bindEvents() {
    // submit 버튼의 클래스 변화를 감시하는 Observer  등록
    // class에 modify class추가/삭제를 통해 추가 / 수정 모드로  변경
    // class변화를 감지하면 btnClassChangeCallback 콜백함수 실행
    const mutationObserver = new MutationObserver((m, o) => this.btnClassChangeCallback(m, o));
    mutationObserver.observe(document.querySelector('#submit-btn'), { attributes: true });

    const CategoryTypeBtns = document.querySelector('.row .category-type').childNodes;
    CategoryTypeBtns.forEach((btn) => {
      btn.addEventListener('click', (ev) => this.typeToggleHandler(ev));
    });
    const moneyinput = document.querySelector('#amount');
    moneyinput.addEventListener('keyup', (ev) => this.amountInputCheckHandler(ev));
    const addbtn = document.querySelector('#submit-btn');
    addbtn.addEventListener('click', (ev) => {
      this.submitBtnEvHandler(ev);
    });

    const formResetBtn = document.querySelector('.reset-btn');
    formResetBtn.addEventListener('click', (ev) => {
      this.formResetBtnEvHnadler(ev);
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
