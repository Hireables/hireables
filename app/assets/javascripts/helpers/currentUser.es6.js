/* global document */

export default class CurrentUser {
  static id() {
    return document.getElementsByName('current_user')[0].getAttribute('id');
  }

  static name() {
    return document.getElementsByName('current_user')[0].content;
  }

  static type() {
    return document.getElementsByName('current_user')[0].getAttribute('type');
  }
}
