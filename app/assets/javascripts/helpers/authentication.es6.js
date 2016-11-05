/* global document */

export default class Authentication {
  constructor() {
    const csrfNode = document.getElementsByName('csrf-token')[0];
    console.log(csrfNode);
    this.csrfToken = csrfNode ? csrfNode.content : '';
  }
}
