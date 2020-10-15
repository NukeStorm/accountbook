/* eslint-disable radix */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import Observer from '../lib/Observer.js';
import { convertNumberFormat } from '../lib/utils.js';
import { removeAccountHistory } from '../lib/Transaction.js';

class HistoryList extends Observer {
  constructor(selector) {
    super();
    this.selector = selector;
    this.removeAccountHistory = removeAccountHistory;
    this.appState = null;
  }

  getDateMap(recordlist = []) {
    const dateMap = new Map();
    recordlist.forEach((record) => {
      // eslint-disable-next-line max-len
      dateMap.has(record.date) ? dateMap.get(record.date).push(record) : dateMap.set(record.date, [record]);
    });
    return dateMap;
  }

  getDailyStastics(recordlist = [], categoryTypeList = []) {
    const statistic = {};
    statistic.date = recordlist[0]?.date;
    categoryTypeList.forEach((type) => {
      statistic[type.typeid] = {
        name: type.name,
        typeid: type.typeid,
        amount: 0,
      };
    });

    recordlist.forEach((record) => {
      statistic[record.Category.type].amount += record.amount;
    });
    return statistic;
  }

  createDailyStasticHtml(data) {
    const dayStasticsHtmlStr = `
            <div class="row header">
            <div class="record-day">${data.date}</div>
            <div class="day-income">+${convertNumberFormat(data[1].amount)}원</div>
            <div class="day-expenditure">-${convertNumberFormat(data[2].amount)}원</div>
          </div>`;
    return dayStasticsHtmlStr;
  }

  createModifyDeleteButtonHtml() {
    const html = `
    <div class="modify-row">
    <button class="modify-btn">수정하기</button>
    <button class="delete-btn">삭제하기</button>
    </div>`;
    return html;
  }

  createDailyRecordListHtml(recordList) {
    let recordListHtmlStr = '';
    recordList.forEach((record) => {
      const categoryType = record.Category.CategoryType.name === '지출' ? 'expenditure' : 'income';
      const recordHtmlStr = `<div class="row content-row" id="row-${record.idx}">
        <div class="category-type-${categoryType}">${record.Category.content}</div>
        <div class="content">${record.content}</div>
        <div class="payment">테스트은행</div>
        <div class="amount category-type-${categoryType}">${convertNumberFormat(record.amount)}원</div>
      </div>
        `;
      recordListHtmlStr += recordHtmlStr;
    });
    return recordListHtmlStr;
  }

  // 해당 가계부 행 위로 마우스 커서 진입할때 수정/삭제 버튼 붙여줌
  rowMouseEnterEvHandler(ev) {
    ev.preventDefault();
    const buttonHtml = this.createModifyDeleteButtonHtml();
    let parent = ev.target;

    if (!parent.classList.contains('content-row')) parent = parent.closest('.content-row');
    parent.insertAdjacentHTML('beforeend', buttonHtml);

    const modifyBtn = document.querySelector('.modify-btn');
    modifyBtn.addEventListener('click', (event) => this.modifyBtnClickEvHandler(event));
    const deletebtn = document.querySelector('.delete-btn');
    deletebtn.addEventListener('click', (event) => this.deleteBtnClickEvHandler(event));
  }

  // 해당 가계부 행 위로 마우스 커서 벗어날때 수정 버튼 제거
  rowMouseLeaveEvHandler(ev) {
    ev.preventDefault();
    let parent = ev.target;
    if (!parent.classList.contains('content-row')) parent = parent.closest('.content-row');
    const modifyBtnNode = parent.querySelector('.modify-row');

    parent.removeChild(modifyBtnNode);
  }

  modifyBtnClickEvHandler(ev) {
    const parent = ev.target.closest('.content-row');
    const contentId = parseInt(parent.id.split('-')[1]);
    const addForm = document.querySelector('#content-add-form');
    addForm.setAttribute('row-id', contentId);
    addForm.querySelector('#submit-btn').classList.add('modify');
  }

  async deleteBtnClickEvHandler(ev) {
    const command = confirm('정말 삭제하시겠습니까?');
    if (!command) return;

    const historyId = ev.target.closest('.content-row')?.id.split('-')[1];
    const res = await this.removeAccountHistory({ idx: historyId });

    if (res) {
      alert('삭제되었습니다.');
      const { currentMonth } = this.appState.state;
      await this.appState.changeMonthState(currentMonth);
    } else {
      alert('삭제 도중 오류가 발생했습니다.');
    }
  }

  bindEvents(state = {}) {
    const recordNodeList = document.querySelectorAll('.content-row');
    recordNodeList.forEach((recordNode) => {
      recordNode.addEventListener('mouseenter', (ev) => this.rowMouseEnterEvHandler(ev, state));
      recordNode.addEventListener('mouseleave', (ev) => this.rowMouseLeaveEvHandler(ev));
    });
  }

  createHtml(state) {
    const { recordlist, categoryTypeList } = state;
    const dateMap = this.getDateMap(recordlist);
    let monthRecordListHtml = '';

    if (dateMap.size === 0) {
      monthRecordListHtml = '<div style="text-align:center"><h2>해당 월의 가계부 기록이 없습니다.</h2></div>';
      return monthRecordListHtml;
    }

    dateMap.forEach((recordList, dayStr, map) => {
      const dayRecordList = map.get(dayStr);
      const statistics = this.getDailyStastics(dayRecordList, categoryTypeList);
      const dailyStatisticHtml = this.createDailyStasticHtml(statistics);
      const dailyRecordListHtml = this.createDailyRecordListHtml(dayRecordList);
      const dayRecordContainerHtmlStr = `<div class="record">${dailyStatisticHtml}${dailyRecordListHtml}<div>`;
      monthRecordListHtml += dayRecordContainerHtmlStr;
    });

    return monthRecordListHtml;
  }

  render(state, selector = this.selector) {
    if (!this.appStatestate) {
      this.appState = state.appStateRef;
    }
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents(state);
  }

  // State가 바뀌면 알림과 변경된  state를 받아  component를 다시 렌더링
  update(state) {
    this.render(state, this.selector);
  }
}

export default HistoryList;
