/* global document */

export default class Authentication {
  static csrfToken() {
    const csrfNode = document.getElementsByName('csrf-token')[0];
    return csrfNode ? csrfNode.content : '';
  }
}
