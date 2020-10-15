/* eslint-disable import/extensions */

import View from '../lib/View.js';
import LoginForm from '../Components/LoginForm.js';

class LoginView extends View {
  constructor() {
    const componentList = [new LoginForm('#login-form')];

    super(componentList, null);
  }

  createHtml() {
    const viewHtmlStr = `<nav>가계부</nav>
    <div id="login-form"></div>
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

export default LoginView;
