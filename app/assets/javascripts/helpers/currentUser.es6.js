export default class CurrentUser {
  id() {
    return parseInt(document.getElementsByName('current_user')[0].getAttribute('id'), 0);
  }

  email() {
    return document.getElementsByName('current_user')[0].getAttribute('email');
  }

  name() {
    return document.getElementsByName('current_user')[0].content;
  }

  authenticated() {
    return document.getElementsByName('logged_in')[0].content === 'true';
  }

  isCurrent(id) {
    return this.id() === id;
  }
}
