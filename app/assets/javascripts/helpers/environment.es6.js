export default class Environment {
  development() {
    return document.getElementsByName('environment')[0].content === 'development';
  }

  production() {
    return document.getElementsByName('environment')[0].content === 'production';
  }

  staging() {
    return document.getElementsByName('environment')[0].content === 'staging';
  }
}
