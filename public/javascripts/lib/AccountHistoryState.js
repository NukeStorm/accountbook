/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import State from './State.js';
import { addAccountHistory, getCategoryList, loadMonthAccountHistory, getCategoryTypeList } from './Transaction.js';
import { getMonthStr } from './utils.js';

class AccountHistoryState extends State {
  constructor() {
    super();
    this.state = {};
    this.addAccountHistory = addAccountHistory;
    this.loadMonthAccountHistory = loadMonthAccountHistory;
    this.getCategoryList = getCategoryList;
    this.getCategoryTypeList = getCategoryTypeList;
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }

  getRecordMap(recordlist = []) {
    const recordMap = new Map();
    recordlist.forEach((record) => {
      // eslint-disable-next-line no-unused-expressions
      recordMap.set(record.idx, record);
    });
    return recordMap;
  }

  getRecordStastics(recordlist = [], categoryTypeList = [], date = '') {
    const stastic = {};
    stastic.date = date;
    categoryTypeList.forEach((type) => {
      stastic[type.typeid] = {
        name: type.name,
        typeid: type.typeid,
        amount: 0,
      };
    });
    recordlist.forEach((record) => {
      stastic[record.Category.type].amount += record.amount;
    });
    return stastic;
  }

  getMonthStr(date) {
    let now = null;
    if (date) now = new Date(date);
    else now = new Date();
    const currentMonthStr = [now.getFullYear(), `0${now.getMonth() + 1}`.slice(-2)].join('-');
    return currentMonthStr;
  }

  getMonthStatistic(monthRecordList = [], categoryTypeList = [], date = '') {
    const monthStatistics = this.getRecordStastics(monthRecordList, categoryTypeList, date);
    return monthStatistics;
  }

  // 현재 상태(현재 달의 데이터)에서 다음 상태(monthstr에 해당하는 달의 데이터)로 상태변경
  async changeMonthState(monthstr) {
    const currentMonth = monthstr;
    const recordlist = await this.loadMonthAccountHistory(currentMonth);
    const recordMap = this.getRecordMap(recordlist);
    const monthRecordStastics = this.getMonthStatistic(recordlist, this.state.categoryTypeList, currentMonth);
    this.update({
      currentMonth,
      recordlist,
      recordMap,
      monthTotalIncomeInfo: monthRecordStastics[1],
      monthTotalExpenditureInfo: monthRecordStastics[2],
    });
  }

  // state 초기화
  async initState() {
    // 현재 달로 state초기화
    const currentMonth = getMonthStr(null);
    const categoryTypeList = await this.getCategoryTypeList();
    const categoryList = [];
    this.update({ currentMonth, categoryTypeList, categoryList });
    await this.changeMonthState(currentMonth);
  }
}
export default AccountHistoryState;
