/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import Observer from '../lib/Observer.js';
import { daysInMonth, getMonthStr, convertNumberFormat } from '../lib/utils.js';

class Calendar extends Observer {
  constructor(selector) {
    super();
    this.selector = selector;
  }

  bindEvents() {}

  createHtml(state = {}) {
    const rowHtmlList = [];
    const { currentMonth } = state;
    // 해당월의 1일
    const startDate = new Date(currentMonth);
    startDate.setDate(1);
    // 0~6 월~일
    // 해당 월의 시작일 1일이 무슨 요일인지
    const startDay = (startDate.getDay() - 1 + 7) % 7;
    const daysOfMonth = daysInMonth(startDate.getFullYear(), startDate.getMonth());

    const rowCnt = startDay + daysOfMonth < 35 ? 5 : 6;

    for (let r = 0; r < rowCnt; r += 1) {
      // r 행 위치 , 1~6행 생성
      const colHtmlList = [];
      // c 열 위치, 0~6행 생성(월~일)
      for (let c = 0; c < 7; c += 1) {
        const dayIdx = c;
        // 달력 칸을 구분지을 id : ${dayIdx}_${r * 7 + c} =>요일인덱스_칸인덱스(0~34)
        const colHtml = `<div class="col" id=${dayIdx}_${r * 7 + c}>
          <div class="date"></div>
          <div class="day-income"></div>
          <div class="day-expenditure"></div>
          </div>`;
        colHtmlList.push(colHtml);
      }
      const rowHtml = `<div class="row">${colHtmlList.join('')}</div>`;

      rowHtmlList.push(rowHtml);
    }
    const headerHtml = `<div class="row header">
    <div class="col">월</div>
    <div class="col">화</div>
    <div class="col">수</div>
    <div class="col">목</div>
    <div class="col">금</div>
    <div class="col">토</div>
    <div class="col">일</div>
    </div>`;
    return headerHtml + rowHtmlList.join('');
  }

  // 해당 월의 시작일-마지막일을 달력 테이블 칸과 매칭
  // 매칭시킨 1~31일에 해당하는 달력칸 node list를 map 형태로{date:col} 반환
  matchMonthWithCalendarTable(state = {}) {
    const { currentMonth } = state;

    const calendarMap = {};
    // 해당월의 1일
    const startDate = new Date(currentMonth);
    startDate.setDate(1);

    // 0~6 월~일
    // 해당 월의 시작일 1일이 무슨 요일인지
    const startDay = (startDate.getDay() - 1 + 7) % 7;
    const daysOfMonth = daysInMonth(startDate.getFullYear(), startDate.getMonth());

    const startIdx = startDay;
    const currentDate = new Date(startDate);
    for (let i = 0; i < daysOfMonth; i += 1) {
      const currentDay = (currentDate.getDay() - 1 + 7) % 7;
      // id : (startIdx + i) : 해당월 (i+1)일에 해당하는 칸 id
      const id = `${currentDay}_${startIdx + i}`;
      const col = document.getElementById(id);
      col.querySelector('.date').innerText = i + 1;
      // 달력 칸을 id:node 형식의 map으로 저장
      calendarMap[currentDate.getDate()] = col;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return calendarMap;
  }

  bindCalnderData(state = {}) {
    const { calendarMap, calenderDataMap } = state;

    calenderDataMap.forEach((data, key, map) => {
      const col = calendarMap[key];
      // 데이터 바인딩할 달력 칸
      col.querySelector('.day-income').innerText = `+${convertNumberFormat(data.income)}원`;
      col.querySelector('.day-expenditure').innerText = `-${convertNumberFormat(data.expenditure)}원`;
    });
  }

  render(state, selector = this.selector) {
    const calendarHtml = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = calendarHtml;
    const calendarMap = this.matchMonthWithCalendarTable(state);
    this.bindCalnderData({ ...state, calendarMap });
    this.bindEvents();
  }

  // State가 바뀌면 알림과 변경된  state를 받아  component를 다시 렌더링
  update(state) {
    this.render(state, this.selector);
  }
}

export default Calendar;
