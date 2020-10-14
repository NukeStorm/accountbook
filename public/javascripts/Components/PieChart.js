/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import Observer from '../lib/Observer.js';

class PieChart extends Observer {
  constructor(selector) {
    super();
    this.selector = selector;
  }

  bindEvents() {}

  createHtml(state) {
    const { data, totalSumAmount } = state;
    const pielist = [];
    let lastPercentage = 0;
    data.forEach((categoryInfo) => {
      const percentage = Math.ceil((categoryInfo.sumAmount / totalSumAmount) * 100).toFixed(0);
      const { color } = categoryInfo;
      const pieHtml2 = `<circle r="25%" cx="50%" cy="50%" style="stroke-dasharray: ${percentage} ${100 - percentage}; stroke: ${color}; stroke-dashoffset: ${lastPercentage}; animation-delay: 0.25s">
      </circle>`;
      lastPercentage -= Number(percentage);
      pielist.push(pieHtml2);
    });

    const svgHtml = `
    <svg class="pie-svg" viewBox="0 0 64 64">
        ${pielist.join('')}
  </svg>`;
    return svgHtml;
  }

  render(state, selector = this.selector) {
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();
  }

  // State가 바뀌면 알림과 변경된  state를 받아  component를 다시 렌더링
  update(state) {
    this.render(state, this.selector);
  }
}

export default PieChart;
