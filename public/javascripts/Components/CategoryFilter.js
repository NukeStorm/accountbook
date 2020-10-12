/* eslint-disable no-this-before-super */
/* eslint-disable radix */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import Observer from '../lib/Observer.js';

class CategoryFilter extends Observer {
  constructor(selector) {
    super();
    this.selector = selector;
  }

  createHtml(state = {}) {
    const { monthTotalIncomeInfo } = state;
    const { monthTotalExpenditureInfo } = state;
    return `
    <div class="category-income">
        <input type="checkbox" name="filter-income" checked />${monthTotalIncomeInfo?.name}:
            <span class="field-income">${monthTotalIncomeInfo?.amount}원</span>
    </div>
    <div class="category-expenditure">
        <input type="checkbox" name="filter-expenditure" checked />${monthTotalExpenditureInfo?.name}:
        <span class="field-expenditure">${monthTotalExpenditureInfo?.amount}원</span>
    </div>`;
  }

  setCategoryTypeFilterHandler() {
    const incomeFilterCheckbox = document.querySelector('input[name="filter-income"]');
    const expenditureFilterCheckbox = document.querySelector('input[name="filter-expenditure"]');
    function ClickfilterHandler(ev) {
      const { target } = ev;
      let filterClassName = null;
      target === incomeFilterCheckbox ? (filterClassName = 'category-type-income') : (filterClassName = 'category-type-expenditure');
      const historyListNode = document.querySelector('.history-list');
      const recordNodeList = historyListNode.querySelectorAll('.record .content-row');

      recordNodeList.forEach((recordNode) => {
        if (recordNode.firstElementChild.classList.contains(filterClassName)) recordNode.classList.toggle('hidden');
      });
    }
    incomeFilterCheckbox.addEventListener('change', ClickfilterHandler);
    expenditureFilterCheckbox.addEventListener('change', ClickfilterHandler);
  }

  bindEvents() {
    this.setCategoryTypeFilterHandler();
  }

  update(state) {
    this.render(state, this.selector);
  }

  render(state, selector = this.selector) {
    const htmlStr = this.createHtml(state);
    const parent = document.querySelector(selector);
    parent.innerHTML = htmlStr;
    this.bindEvents();
  }
}
export default CategoryFilter;
