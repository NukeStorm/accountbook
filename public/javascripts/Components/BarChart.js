/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import Observer from '../lib/Observer.js';
import { convertNumberFormat } from '../lib/utils.js';

class BarChart extends Observer {
  constructor(selector) {
    super();
    this.selector = selector;
  }

  bindEvents() {}

  getbarChartRowHtml(rowState = {}) {
    const width = (rowState.sumAmount / rowState.totalSumAmount) * rowState.maxWidth;
    const percentage = ((rowState.sumAmount / rowState.totalSumAmount) * 100).toFixed(2);
    const { color } = rowState;
    const category = rowState['Category.content'];
    const amount = rowState.sumAmount;

    const svgstr = `
    <svg class="bar-chart"  height="50px"aria-labelledby="title desc" role="img">
        <g class="bar">
          <rect width="${width}px"  fill="${color}" height="25" y="0">
            <animate attributeName="width" from="0" to="${width}" dur="0.5s" fill="freeze"></animate>
          </rect>
        </g>
        </svg>
    `;

    const rowHtml = `<div class="row">
    <div class="category">${category}</div>
    <div class= "percentage">${percentage}%</div>
    <div class= "barchart">
     ${svgstr}
    </div>
    <div class="amount">지출액:${convertNumberFormat(amount)}원</div>
    </div>`;
    return rowHtml;
  }

  createHtml(state) {
    const { data, totalSumAmount } = state;
    const maxWidth = 300;
    const rowHtmlList = [];
    data.forEach((categoryInfo) => {
      const { color } = categoryInfo;
      const rowHtml = this.getbarChartRowHtml({
        ...categoryInfo,
        totalSumAmount,
        maxWidth,
        color,
      });
      rowHtmlList.push(rowHtml);
    });

    const categoryChartHtml = rowHtmlList.join('');
    return categoryChartHtml;
  }

  render(state, selector = this.selector) {
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();

    const { totalSumAmount } = state;
    document.querySelector('.month-total-expenditure').innerText = `이번달 지출금액: ${convertNumberFormat(totalSumAmount)}원`;
  }

  // State가 바뀌면 알림과 변경된  state를 받아  component를 다시 렌더링
  update(state) {
    this.render(state, this.selector);
  }
}

export default BarChart;
