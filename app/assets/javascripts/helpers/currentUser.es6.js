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

  avatar() {
    return document.getElementsByName('current_user')[0].getAttribute('avatar');
  }

  profileColor() {
    return document.getElementsByName('current_user')[0].getAttribute('profile_color');
  }

  role() {
    return document.getElementsByName('role')[0].getAttribute('content');
  }

  education() {
    return document.getElementsByName('current_user')[0].getAttribute('education');
  }

  authenticated() {
    return document.getElementsByName('logged_in')[0].content === 'true';
  }

  isCurrent(id) {
    return this.id() === id;
  }
}
