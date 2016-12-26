/* global document */

export default class CurrentUser {
  constructor() {
    const currentUserNode = document.getElementsByName('current_user')[0];
    this.id = currentUserNode ? parseInt(currentUserNode.getAttribute('id'), 0) : null;
    this.name = currentUserNode ? currentUserNode.content : null;
    this.avatar = currentUserNode ? currentUserNode.getAttribute('avatar') : null;
    this.type = currentUserNode ? currentUserNode.getAttribute('type') : null;
    this.isEmployer = this.type === 'employer';
    this.isDeveloper = this.type === 'developer';
    this.isOwner = id => (this.id === id);
  }
}
