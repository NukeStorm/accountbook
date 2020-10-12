class Subject {
  constructor() {
    this.observers = [];
  }

  // observer 추가
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 현재 subject에게 알림받고있는 observer를 제거
  removeObserver(observer) {
    const removeIndex = this.observers.findIndex((obs) => observer === obs);

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  // 등록된 obsserver에 subject의 변경사항을 알림
  //  observer가 알림받고 각 observer에서 구현된 update 실행하도록함
  notify(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.update(data));
    }
  }
}

export default Subject;
