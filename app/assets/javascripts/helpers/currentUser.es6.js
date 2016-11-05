/* global document */

export default class CurrentUser {
  constructor() {
    const currentUserNode = document.getElementsByName('current_user')[0];
    this.id = currentUserNode ? currentUserNode.getAttribute('id') : null;
    this.name = currentUserNode ? currentUserNode.content : null;
    this.type = currentUserNode ? currentUserNode.getAttribute('type') : null;
    this.employer = this.type === 'employer';
    this.developer = this.type === 'developer';
  }
}
