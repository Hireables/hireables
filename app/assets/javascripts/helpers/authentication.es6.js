export default class Authentication {
  csrfToken() {
    const csrfNode = document.getElementsByName('csrf-token')[0];
    return csrfNode ? csrfNode.content : '';
  }
}
