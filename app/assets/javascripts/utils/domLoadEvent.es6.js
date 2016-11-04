/* global Turbolinks */

const domLoadEvent = () => {
  if (typeof Turbolinks !== 'undefined'
      && typeof Turbolinks.controller !== 'undefined'
    ) {
    return 'turbolinks:load';
  }
  return 'DOMContentLoaded';
};

export default domLoadEvent();
