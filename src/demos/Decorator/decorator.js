/* eslint-disable */
// es6 decorator的用法

class BaseModel {
  // 将后端数据直接映射到当前的示例上
}

//
class CarModel extends BaseModel {
  @observable
  @check(CheckType.Number)
  @Unit(UnitType.Price_Unit_Wy)
  price = 0;

  @observable
  @check(CheckType.String)
  @ServerName('seller_name')
  sellerName = '';

}


function CheckerDecorator(type) {
  return function(target, name, descriptor) {
    let v = descriptor.initializer && descriptor.initializer.call(this);
    return {
      enumerable: true,
      configurable: true,
      get: function() {
        return v;
      },
      set: function(newVal) {
        // 在此对传入的 c 的值做各种检查
        var cType = typeof(c);
        // ...
        v = c;
      },
    }
  }
}

function Check(type) {
  return function(target, name, descriptor) {
    let v = descriptor.initializer && descriptor.initializer.call(this);
    // 将属性名字以及需要的类型的对应关系记录到类的原型上
    if (!target.constructor.__checkers__) {
      // 将这个隐藏属性定义成 not enumerable，遍历的时候是取不到的。
      Object.defineProperty(target.constructor, '__checkers__', {
        value: {},
        enumerable: false,
        writable: true,
        configurable: true
      });
    }

    target.construtor.__checkers__[name] = {
      type: type,
    };

    return descriptor
  }
}
