/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import State from '../State.js';
import { loadMonthStatistic } from '../Transaction.js';
import { getMonthStr, toRGBCode } from '../utils.js';

class StatisticState extends State {
  constructor() {
    super();
    this.state = {};
    this.loadMonthStatistic = loadMonthStatistic;
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }

  // 현재 상태(현재 달의 데이터)에서 다음 상태(monthstr에 해당하는 달의 데이터)로 상태변경
  async changeMonthState(monthstr) {
    const currentMonth = monthstr;
    const { totalSumAmount, data } = await this.loadMonthStatistic(monthstr);

    let red = 204;
    let green = 229;
    const blue = 255;

    data.forEach((categoryData) => {
      const color = toRGBCode(red, green, blue);
      red = Math.floor(red - red * (0.3 / data.length));
      green = Math.floor(green - green * (0.7 / data.length));
      // eslint-disable-next-line no-param-reassign
      categoryData.color = color;
    });
    this.update({
      currentMonth,
      data,
      totalSumAmount,
    });
  }

  // state 초기화
  async initState() {
    // 현재 달로 state초기화
    const currentMonth = getMonthStr(null);
    await this.changeMonthState(currentMonth);
  }
}
export default StatisticState;
