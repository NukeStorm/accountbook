/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
import AccountHistoryState from '../lib/AccountHistoryState.js';
import MonthSelector from '../Components/MonthSelector.js';
import ContentAddForm from '../Components/ContentAddForm.js';
import CategoryFilter from '../Components/CategoryFilter.js';
import HistoryList from '../Components/HistoryList.js';
import View from '../lib/View.js';

class MainView extends View {
  constructor() {
    const componentList = [new MonthSelector('#monthSelector'), new ContentAddForm('#content-add-form'), new CategoryFilter('#category-type-filter'), new HistoryList('#history-list')];
    const appState = new AccountHistoryState();
    super(componentList, appState);
  }

  createHtml() {
    const viewHtmlStr = `<nav>가계부</nav>
   <div class="month" id="monthSelector"></div>
   <div class="menu-bar">
     <ul>
       <li>
         <a href="/"><div class="menu-history">내역</div></a>
       </li>
       <li>
         <a href="/calender"><div class="menu-calender">달력</div></a>
       </li>
       <li>
         <a href="/statistics"><div class="menu-stastics">통계</div></a>
       </li>
     </ul>
   </div>
   <div class="content-add-form" id="content-add-form"></div>
   <div class="category-type-filter" id="category-type-filter"></div>
   <div class="history-list" id="history-list">
     <div class="record"></div>
   </div>`;
    return super.createHtml(viewHtmlStr);
  }

  async render() {
    const app = document.querySelector('#app');
    const htmlStr = this.createHtml();
    app.innerHTML = htmlStr;
    await super.render();
    console.log('view 생성');
  }
}

async function Main() {
  const mainView = new MainView();
  await mainView.render();
}
Main();
/*
async function main() {
  const AppState = new AccountHistoryState(); // application state
  const monthSelector = new MonthSelector(AppState, '#monthSelector');
  const contentAddForm = new ContentAddForm(AppState, '#content-add-form');
  const categoryList = [];
  const categoryTypeList = await AppState.getCategoryTypeList();
  const historyList = new HistoryList('#history-list');
  const categoryFilter = new CategoryFilter('#category-type-filter');

  document.appstate = AppState;

  AppState.update({ currentMonth: MonthSelector.getMonthStr() });
  const recordlist = await AppState.loadMonthAccountHistory(AppState.state.currentMonth);

  AppState.update({ categoryTypeList, categoryList });
  AppState.update({ recordlist });

  const monthRecordStastics = AppState.getMonthStatistic(AppState.state.recordlist, AppState.state.categoryTypeList, AppState.state.currentMonth);
  AppState.update({ monthTotalIncomeInfo: monthRecordStastics[1], monthTotalExpenditureInfo: monthRecordStastics[2] });

  AppState.addObserver(historyList);
  AppState.addObserver(categoryFilter);

  monthSelector.render('#monthSelector');
  contentAddForm.render('#content-add-form');
  historyList.render(AppState.get(), '#history-list');
  categoryFilter.render(AppState.get(), '#category-type-filter');
  // AppState.addObserver(monthSelector);
}
main();
*/
