/* global document */

function Environment() {
  const environmentNode = document.getElementsByName('environment')[0];
  this.isDevelopment = environmentNode ? environmentNode.content === 'development' : false;
  this.isProduction = environmentNode ? environmentNode.content === 'production' : false;
}

export default new Environment();
