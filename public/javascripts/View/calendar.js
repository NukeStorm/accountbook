/* eslint-disable import/extensions */

import CalendarState from '../lib/state/CalendarState.js';
import Calendar from '../Components/Calendar.js';
import MonthSelector from '../Components/MonthSelector.js';
import MenuBar from '../Components/MenuBar.js';
import NavBar from '../Components/NavBar.js';
import View from '../lib/View.js';

class CalendarView extends View {
  constructor() {
    const componentList = [new MonthSelector('#monthSelector'), new NavBar('#nav-bar'), new MenuBar('#menu-bar'), new Calendar('#calender-area')];
    const appState = new CalendarState();
    super(componentList, appState);
  }

  createHtml() {
    const viewHtmlStr = `<nav id="nav-bar"></nav>
    <div class="month" id="monthSelector"></div>
    <div class="menu-bar" id="menu-bar"></div>
    <div id="calender-area"></div>
 `;
    return super.createHtml(viewHtmlStr);
  }

  async render() {
    const app = document.querySelector('#app');
    const htmlStr = this.createHtml();
    app.innerHTML = htmlStr;
    await super.render();
  }
}

export default CalendarView;
