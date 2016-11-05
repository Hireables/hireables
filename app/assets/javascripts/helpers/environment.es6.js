/* global document */

export default class Environment {
  constructor() {
    const environmentNode = document.getElementsByName('environment')[0];
    this.isDevelopment = environmentNode ?
      environmentNode.content === 'development' : false;
    this.isProduction = environmentNode ?
      environmentNode.content === 'production' : false;
  }
}
