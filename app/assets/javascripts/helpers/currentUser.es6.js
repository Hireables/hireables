/* global document */

export default class CurrentUser {
  static id() {
    return parseInt(document.getElementsByName('current_user')[0].getAttribute('id'), 0);
  }

  static email() {
    return document.getElementsByName('current_user')[0].getAttribute('email');
  }

  static name() {
    return document.getElementsByName('current_user')[0].content;
  }

  static authenticated() {
    return document.getElementsByName('logged_in')[0].content === 'true';
  }

  static isCurrent(id) {
    return this.id() === id;
  }
}
