/* global document */

function Authentication() {
  const csrfNode = document.getElementsByName('csrf-token')[0];
  this.csrfToken = csrfNode ? csrfNode.content : '';
}

export default new Authentication();
