/**
 *
 * @param {string} [message='Default Message']
 */
function ToastError(message = 'Default Message') {
  this.name = 'ToastError';
  this.message = message;
  this.stack = (new Error()).stack;
}

ToastError.prototype = Object.create(Error.prototype);
ToastError.prototype.constructor = ToastError;

export default ToastError;
