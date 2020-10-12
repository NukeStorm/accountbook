/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import Observer from './Observer.js';

class View {
  constructor(componentlist = [], state) {
    this.appState = state;
    this.componentlist = componentlist;
    this.componentlist.forEach((component) => {
      if (component instanceof Observer) {
        this.appState.addObserver(component);
      } else component.importState(this.appState);
    });
  }

  async render() {
    await this.appState.initState();
    this.componentlist.forEach((component) => {
      if (!(component instanceof Observer)) component.render();
    });
  }

  createHtml(htmlstr) {
    return htmlstr;
  }
}

export default View;
