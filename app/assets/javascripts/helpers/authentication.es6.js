export default class Authentication {
  csrfToken() {
    const csrfNode = document.getElementsByName('csrf-token')[0];
    return csrfNode ? csrfNode.content : '';
  }

  authToken() {
    const tokenNode = document.getElementsByName('auth-token')[0];
    return tokenNode ? tokenNode.content : '';
  }

  wistiaToken() {
    const tokenNode = document.getElementsByName('wistia-token')[0];
    return tokenNode ? tokenNode.content : '';
  }
}
