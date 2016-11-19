/* global window */
import PromiseWindow from 'promise-window';

const popup = (linkUrl) => {
  const promiseWindow = new PromiseWindow(linkUrl, {
    width: Math.floor(window.outerWidth * 0.8),
    height: Math.floor(window.outerHeight * 0.5),
  });

  const timeout = window.setTimeout(() => { promiseWindow.close(); }, 30000);
  const authPromise = new Promise((resolve, reject) => {
    promiseWindow.open().then(
      (data) => {
        window.clearTimeout(timeout);
        resolve(JSON.parse(data.auth));
      },
      (error) => {
        window.clearTimeout(timeout);
        switch (error) {
          case 'closed':
            reject('Login window closed');
            break;
          case 'error':
            reject('Unable to login. Please try again!');
            break;
          default:
            reject('Something went wrong. Please try again!');
        }
      }
    );
  });
  return authPromise;
};

export default popup;
