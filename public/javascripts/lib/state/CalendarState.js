/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import State from '../State.js';
import { loadMonthAccountHistory } from '../Transaction.js';
import { getMonthStr, toRGBCode } from '../utils.js';

class CalendarState extends State {
  constructor() {
    super();
    this.state = {};
    this.loadMonthAccountHistory = loadMonthAccountHistory;
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }

  // 해당월의 일별 수입/지출 기록 array를 달력에 필요한  map형태로 가공
  getcalenderDataMap(recordlist = []) {
    const dateMap = new Map();
    recordlist.forEach((record) => {
      // eslint-disable-next-line max-len
      const date = new Date(record.date).getDate();

      let income = 0;
      let expenditure = 0;

      if (record.Category.type === 1) income = record.amount;
      else if (record.Category.type === 2) expenditure = record.amount;

      if (dateMap.has(date)) {
        const data = dateMap.get(date);
        data.income += income;
        data.expenditure += expenditure;
      } else dateMap.set(date, { income, expenditure });
    });
    return dateMap;
  }

  // 달력UI에 바인딩 할 해당 월(monthstr:YYYY-MM) 수입/지출기록 map 데이터 반환
  async getNewMonthData(monthstr) {
    const recordlist = await this.loadMonthAccountHistory(monthstr);
    return this.getcalenderDataMap(recordlist);
  }

  // 현재 상태(현재 달의 데이터)에서 다음 상태(monthstr에 해당하는 달의 데이터)로 상태변경
  async changeMonthState(monthstr) {
    const currentMonth = monthstr;
    const calenderDataMap = await this.getNewMonthData(currentMonth);
    // 달력 컴포넌트(Observer)에서 관찰하고 있는 state 업데이트
    // -> 달력 컴포넌트 알림받고 render 함수 호출하여 렌더링
    this.update({
      currentMonth,
      calenderDataMap,
    });
  }

  // state 초기화
  async initState() {
    // 현재 달로 state초기화
    const currentMonth = getMonthStr(null);
    await this.changeMonthState(currentMonth);
  }
}
export default CalendarState;
