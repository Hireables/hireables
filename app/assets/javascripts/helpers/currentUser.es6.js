/* global document */

function CurrentUser() {
  const currentUserNode = document.getElementsByName('current_user')[0];
  this.id = currentUserNode ? currentUserNode.getAttribute('id') : null;
  this.name = currentUserNode ? currentUserNode.content : null;
  this.type = currentUserNode ? currentUserNode.getAttribute('type') : null;
}

export default new CurrentUser();
