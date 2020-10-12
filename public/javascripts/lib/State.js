/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import Subject from './Subject.js';

class State extends Subject {
  constructor() {
    super();
    this.state = {};
  }

  // state를 업데이트
  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  // Get the state.
  get() {
    return this.state;
  }
}

export default State;
