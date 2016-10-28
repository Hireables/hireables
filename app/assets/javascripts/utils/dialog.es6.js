/* global document window */

import dialogPolyfill from 'dialog-polyfill';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class Dialog {
  constructor(params) {
    this.reactNodeId = params.reactNodeId;
    this.dialogId = params.dialogId;
    this.dialog = this.register();
  }

  resize() {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        $(this.dialog).css({
          height: $(window).height() - 80,
          'overflow-y': 'scroll',
        });
      }, 66);
    }
  }

  register() {
    const dialog = this.get();
    if (typeof HTMLDialogElement !== 'function') {
      dialogPolyfill.registerDialog(dialog);
      dialogPolyfill.registerDialog(dialog);
    }
    return dialog;
  }

  get() {
    return document.getElementById(this.dialogId);
  }

  close() {
    if (this.dialog.open) {
      this.dialog.close();
      document.body.classList.remove('dialog-open');
      ReactDOM.unmountComponentAtNode(
        document.getElementById(this.reactNodeId)
      );
    }
  }

  toggle() {
    this.dialog.showModal();
    document.body.classList.add('dialog-open');
  }
}
