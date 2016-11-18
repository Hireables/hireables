/* global window OAuth */

export default class Meetup {
  constructor() {
    OAuth.initialize(window.OAUTH_KEY);
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      OAuth.popup('meetup')
      .done((result) => {
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + result.expires_in);
        result.me().then((data) => {
          resolve({
            access_token: result.access_token,
            expires_at: expirationTime,
            uid: data.raw.id,
          });
        });
      }).fail(err => (reject(err)));
    });
  }
}
