/* global window IN Routes */

import $ from 'jquery';

export default class Linkedin {
  constructor() {
    $.getScript(window.LINKEDIN_JS_SDK_URL, (data, textStatus) => {
      if (textStatus === 'success') {
        IN.init({
          api_key: window.LINKEDIN_CLIENT_ID,
          scope: 'r_basicprofile r_emailaddress',
          lang: 'en_US',
          credentials_cookie: true,
        });
      }
    });
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      IN.User.authorize(() => {
        const auth = IN.ENV.auth;
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + 3600);
        resolve({
          access_token: auth.oauth_token,
          uid: auth.member_id,
          expires_at: expirationTime,
        });
      }, () => { reject('Can not login. Please try again!'); });
    });
  }
}
