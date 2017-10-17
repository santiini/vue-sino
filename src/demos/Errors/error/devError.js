/**
 * 开发者的异常
 * @param {string} [message='Default Message']
 */
function DevError(message = 'Default Message') {
  this.name = 'ToastError';
  this.message = message;
  this.stack = (new Error()).stack;
}

DevError.prototype = Object.create(Error.prototype);
DevError.prototype.constructor = DevError;

export default DevError;
