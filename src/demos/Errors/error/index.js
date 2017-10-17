/**
 * 异常的几种管理
 */
/* eslint-disable */
import EnsureError from './ensureError.js';
import ToastError from './toastError.js';
import DevError from './devError.js';
import EnsurePopup from './ensurePopup.js';
import ToastPopup from './toastPopup.js';

function errorHandler(err) {
  if (err instanceof EnsureError) {
    EnsurePopup(err.message);
  } else if (err instanceof ToastError) {
      ToastPopup(err.message);
    } else if (err instanceof DevError) {
      DevError(err.message);
    } else {
      error.message += ` https://stackoverflow.com/questions?q=${encodeURI(error.message)}`
      console.error(err.message);
    }
}

window.onerror = (msg, url, line, col, err) => {
  errorHandler(err);
}

window.onunhandledrejection = (event) => {
  errorHandler(event.reason);
};

export default errorHandler;
