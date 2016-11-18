/* global window */

const popup = (linkUrl) => {
  const windowArea = {
    width: Math.floor(window.outerWidth * 0.8),
    height: Math.floor(window.outerHeight * 0.5),
  };

  if (windowArea.width < 1000) { windowArea.width = 1000; }
  if (windowArea.height < 630) { windowArea.height = 630; }
  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  const sep = (linkUrl.indexOf('?') !== -1) ? '&' : '?';
  const url = `${linkUrl}${sep}`;
  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${windowArea.width},height=${windowArea.height},
    left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(url, 'producthuntPopup', windowOpts);
  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  // Listen to message from child window
  const authPromise = new Promise((resolve, reject) => {
    eventer(messageEvent, (e) => {
      if (e.origin !== window.SITE_DOMAIN) {
        authWindow.close();
        reject('Not allowed');
      }

      if (e.data.auth) {
        resolve(JSON.parse(e.data.auth));
        authWindow.close();
      } else {
        authWindow.close();
        reject('Unauthorised');
      }
    }, false);
  });

  return authPromise;
};

export default popup;
