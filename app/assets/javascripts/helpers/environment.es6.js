/* global document */

export default class Environment {
  static development() {
    return document.getElementsByName('environment')[0].content === 'development';
  }

  static production() {
    return document.getElementsByName('environment')[0].content === 'production';
  }

  static staging() {
    return document.getElementsByName('environment')[0].content === 'staging';
  }
}
