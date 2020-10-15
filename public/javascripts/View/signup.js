/* eslint-disable import/extensions */

import View from '../lib/View.js';
import SignupForm from '../Components/SignupForm.js';

class SignupView extends View {
  constructor() {
    const componentList = [new SignupForm('#signup-form')];

    super(componentList, null);
  }

  createHtml() {
    const viewHtmlStr = `<nav>가계부</nav>
    <div id="signup-form"></div>
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

export default SignupView;
