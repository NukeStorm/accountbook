/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
import AccountHistoryState from '../lib/state/AccountHistoryState.js';
import MonthSelector from '../Components/MonthSelector.js';
import ContentAddForm from '../Components/ContentAddForm.js';
import CategoryFilter from '../Components/CategoryFilter.js';
import HistoryList from '../Components/HistoryList.js';
import MenuBar from '../Components/MenuBar.js';
import NavBar from '../Components/NavBar.js';
import View from '../lib/View.js';

class MainView extends View {
  constructor() {
    const componentList = [new MonthSelector('#monthSelector'), new NavBar('#nav-bar'), new MenuBar('#menu-bar'), new ContentAddForm('#content-add-form'), new CategoryFilter('#category-type-filter'), new HistoryList('#history-list')];
    const appState = new AccountHistoryState();
    super(componentList, appState);
  }

  createHtml() {
    const viewHtmlStr = `<nav id="nav-bar"></nav>
   <div class="month" id="monthSelector"></div>
   <div class="menu-bar" id="menu-bar"> </div>
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
  }
}

export default MainView;
