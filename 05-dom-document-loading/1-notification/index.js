export default class NotificationMessage {

  static mainElement;
  static timerId;

  constructor(message = 'Hello world!', {
    duration = 1000,
    type = 'success'
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
    <div class="notification ${this.type}" style="${'--value:' + this.duration / 1000 + 's'}">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }

  render() {
    if (NotificationMessage.mainElement) {
      clearTimeout(NotificationMessage.timerId);
      this.remove();
    }

    const element = document.createElement('div');
    element.innerHTML = this.template;
    NotificationMessage.mainElement = element.firstElementChild;
    this.element = element.firstElementChild;
  }

  show(appendTo = document.body) {
    appendTo.append(NotificationMessage.mainElement);
    NotificationMessage.timerId = setTimeout(this.remove, this.duration);
  }

  remove() {
    NotificationMessage.mainElement.remove();
  }

  destroy() {
    this.remove();
  }
}
