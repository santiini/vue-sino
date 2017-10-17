/**
 * 对于展示给用户的异常, 需要点击确认的异常类型
 */
function EnsureError(message = 'Default Message') {
  this.name = 'EnsureError';
  this.message = message;
  this.stack = (new Error()).stack;
}

EnsureError.prototype = Object.create(Error.prototype);
EnsureError.protorype.construtor = EnsureError;

export default EnsureError;
