/* eslint-disable import/extensions */
import PieChart from '../Components/PieChart.js';
import BarChart from '../Components/BarChart.js';
import StatisticState from '../lib/state/StatisticState.js';
import MonthSelector from '../Components/MonthSelector.js';
import MenuBar from '../Components/MenuBar.js';

import View from '../lib/View.js';

class StatisticView extends View {
  constructor() {
    const componentList = [new MonthSelector('#monthSelector'), new MenuBar('#menu-bar'), new PieChart('#pie-chart-area'), new BarChart('#bar-chart-area')];
    const appState = new StatisticState();
    super(componentList, appState);
  }

  createHtml() {
    const viewHtmlStr = `<nav>가계부</nav>
    <div class="month" id="monthSelector"></div>
    <div class="menu-bar" id="menu-bar"></div>
    <div id="option-selector"><input type="radio" name="type" />카테고리별지출 <input type="radio" name="type" />일별지출 <span class="month-total-expenditure">이번달 지출금액</span></div>
    <div id="pie-chart-area"></div>
    <div id="bar-chart-area"></div>`;
    return super.createHtml(viewHtmlStr);
  }

  async render() {
    const app = document.querySelector('#app');
    const htmlStr = this.createHtml();
    app.innerHTML = htmlStr;
    await super.render();
  }
}

export default StatisticView;
