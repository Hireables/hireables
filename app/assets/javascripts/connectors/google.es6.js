/* global window document gapi */

import $ from 'jquery';

export default class Google {
  constructor() {
    $.getScript(window.GOOGLE_JS_SDK_URL, (data, textStatus) => {
      if (textStatus === 'success' && gapi !== undefined) {
        gapi.load('client:auth2', this.initClient);
      }
    });
  }

  initClient() {
    gapi.client.init({
      apiKey: window.GOOGLE_API_KEY,
      clientId: window.GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/youtube',
    });
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      gapi
      .auth2
      .getAuthInstance()
      .signIn()
      .then((data) => {
        const expirationTime = new Date();
        expirationTime.setSeconds(data.Zi.expires_in);
        resolve({
          access_token: data.Zi.access_token,
          uid: data.El,
          expires_at: expirationTime,
        });
      }, () => {
        reject('Can not login. Please try again!');
      });
    });
  }
}
