// Symbol: JavaScript 语言的第七种数据类型, 表示独一无二的值
// tips:
// 1. Symbol函数前不能使用new命令，否则会报错
// 2. 由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
// 3. Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
// 4. Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

/* eslint-disable */
// 1. 新建 Symbol
const createFunc = () => {
  // 1. string 参数
  // const s0 = Symbol();
  const s1 = Symbol('sola');
  const s2 = Symbol('land');
  console.log('新建Symbol');
  console.log(s1);
  console.log(s2);
  console.log(s1.toString())
  console.log(s2.toString())
  // 2. object 参数
  const obj = {
    toString() {
      return 'abc';
    },
  };
  const s3 = Symbol(obj);
  console.log('传参对象描述');
  console.log(s3);
  console.log(s3.toString());
  // 3. Symbol 传参只是描述，相同的参数指向的不是同一个 Symbol, 因为 Symbol 唯一;
  // const s00 = Symbol();
  const s11 = Symbol('sola');
  console.log('比较相同参数的Symbol');
  console.log(s1 === s11)
};

// 2. 值的转换和运算： 无法计算，可以转换为字符串
const testFunc2 = () => {
  const sym = Symbol('My Symbol');
  // 1.计算：
  // console.log(`${sym}ssssss`); // 无法拼接 string
  // console.log(sym + 1111); // 无法和数字计算;
  // 2. 转化为 Stirng
  console.log(String(sym));
  console.log(sym.toString());
  // 3. 转化为 Boolean
  console.log(Boolean(sym));
  // 4. 转化为 Number
  // console.log(Number(sym)); // 无法转换为 Number
};

// 3. 作为属性名的 Symbol: 唯一性确定唯一属性;
// tips: Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
const testFunc3 = () => {
  const sym1 = Symbol('my Symbol');
  const sym2 = Symbol('my Symbol Func');
  const obj = {
    // tips: 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
    [sym1]: 'Symbol作为属性名',
    [sym2]() {
      console.log('这是一个函数名为 Symbol 的方法');
    },
  };
  // tips: Symbol 值作为对象属性名时，不能用点运算符。
  console.log(obj[sym1]);
  obj[sym2]();
};

// 4. Symbol 和常量的配合使用, 比如 vuex 中的 mutations-type;
// 最大的好处: 保证常量的值都是不相等的, 指向性唯一
const testFunc4 = () => {
  const COLOR_RED = Symbol('red');
  const COLOR_BLUE = Symbol('blue');
  const switchColor = (color) => {
    switch (color) {
      case COLOR_RED:
        return 'red';
      case COLOR_BLUE:
        return 'blue';
      default:
        return 'white';
    }
  };
  console.log(switchColor(COLOR_BLUE));
  console.log(switchColor(COLOR_RED));
};

// 5. 实例：消除魔术字符串
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
// 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
function getArea1(shape, options) {
  let area = 0;
  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = 0.5 * options.width * options.height;
      break
    // ...
    default:
      area = 0;
  }
  return area;
}
// 替换为 Symbol
const shapeType = {
  triangle: 'Triangle',
};
function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height;
      break;
    default:
      area = 0;
  }
  return area;
}

const areaFunc = () => {
  getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
  getArea(shapeType.triangle, { width: 100, height: 100 });
};


// 6. 属性名的遍历
// 1. Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
//    也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
// 2. Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
// 3. Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

const forFunc = () => {
  const obj = { name: 'santiiny' };
  const sym = Symbol('test');

  Object.defineProperty(obj, sym, {
    value: 'foobar',
    enumerable: true,
  });
  console.log('遍历属性')
  for (let i in obj) {
    console.log(i)
  }
  console.log(Object.getOwnPropertyNames(obj)); // 获取一般属性名
  console.log(Object.getOwnPropertySymbols(obj)); // 获取 Symbol 属性名;
  // Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
  console.log(Reflect.ownKeys(obj));
};

// 7. 由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。
// 我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法
const testFunc5 = () => {
  let size = Symbol('size'); // 声明 Symbol
  // 声明类
  class Collection {
    constructor() {
      this[size] = 0;
    }

    add(item) {
      this[this[size]] = item;
      this[size] ++;
    }

    static sizeOf(instance) {
      return instance[size];
    }
  }

  let test = new Collection();
  console.log(Collection.sizeOf(test));

  test.add('demo1');
  console.log(Collection.sizeOf(test));

  console.log(Object.keys(test));
  console.log(Object.getOwnPropertyNames(test));
  console.log(Object.getOwnPropertySymbols(test));
};


// 8. Symbol.for()，Symbol.keyFor()
  // 8.1
  // Symbol.for(arg): 如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值
  // Symbol(arg): 生成新的 Symbol;
  // 8.2 Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
const testFunc6 = () => {
  const s1 = Symbol.for('test'); // 创建 Symbol
  const s2 = Symbol.for('test') // 检索到有，直接返回 Symbol
  console.log(s1 === s2); // 同一个Symbol;
  console.log(Symbol.for('demo') === Symbol.for('demo')); // 同一个;
  console.log(Symbol('demo2') === Symbol('demo2')); // 分别创建的不同 Symbol;

  // Symbol.keyFor(Symbol) -- 一个已登记的 Symbol 类型值的key。
  // 未找到则返回 undefiend
  const s3 = Symbol('test3'); // 不同过 Symbol.for() 创建的 Symbol 无法检索到;
  console.log(Symbol.keyFor(s1))
  console.log(Symbol.keyFor(s3))
};


// 9. 模块的 Singleton 模式: 单例模型
// Singleton模式指的是调用一个类，任何时候返回的都是同一个实例。
// mod.js
const testFunc7 = () => {
  const FOO_KEY = Symbol.for('foo');
  function FuncA() {
    this.foo = 'hello';
  }
  if (!window[FOO_KEY]) {
    window[FOO_KEY] = new FuncA();
  }
  // module.exports = global[FOO_KEY]; //可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。

  // test.js
  window[Symbol.for('foo')] = 123;
};


// 内置Symbol: ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

// demo1： Symbol.hasInstance
// 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
const demoFunc1 = () => {
  class MyClass {
    [Symbol.hasInstance](obj) {
      return obj instanceof Array;
    }
  };
  // MyClass 的实例方法， 会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。
  console.log([1,2,3] instanceof new MyClass())

  class Even {
    static [Symbol.hasInstance](obj) {
      return Number(obj) % 2 === 0;
    }
  };
  // 等同于
  const Even1 = {
    [Symbol.hasInstance](obj) {
      return Number(obj) % 2 === 0;
    }
  };
  console.log(1 instanceof Even);
  console.log(2 instanceof Even);
  console.log(12345 instanceof Even);
};

// demo2: Symbol.isConcatSpreadable
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
const demoFunc2 = () => {
  const arr1 = [1, 2, 3];
  const arr2 = ['a', 'c'].concat(arr1)
  console.log(arr2)
  console.log(arr1[Symbol.isConcatSpreadable])

  const arr11 = [11, 22, 33];
  console.log(arr1[Symbol.isConcatSpreadable])
  arr11[Symbol.isConcatSpreadable] = false;
  const arr22 = ['aa', 'cc'].concat(arr11);
  console.log(arr22)

  // 对于类数组 (array-like)对象，默认不展开。期望展开其元素用于连接，需要设置 Symbol.isConcatSpreadable 为true：
  // 类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
  const arr3 = { length: 2, 0: 'aa', 1: 'ddd' };
  const arr4 = ['ttt', 'ggg'].concat(arr3, 'ppppp');
  console.log(arr4);
  const arr33 = { length: 2, 0: 'aa', 1: 'ddd' };
  arr33[Symbol.isConcatSpreadable] = true;
  const arr5 = ['eeeee', 'ttttt'].concat(arr33, 'hhhhhhhh')
  console.log(arr5)

  // 在对象或 Class 中使用;
  const arrayLike = {
    [Symbol.isConcatSpreadable]: true,
    length: 2,
    0: 'hello',
    1: 'world',
  };
  console.log([0, 1, 2].concat(arrayLike));
  class A1 extends Array {
    constructor(args) {
      super(args);
      this[Symbol.isConcatSpreadable] = true;
    }
  }
  class A2 extends Array {
    constructor(args) {
      super(args);
      // this[Symbol.isConcatSpreadable] = false;
    }
    get [Symbol.isConcatSpreadable]() {
      return false;
    }
  }
  let a1 = new A1();
  a1[0] = 'aa';
  a1[1] = 'bb';
  let a2 = new A2();
  a2[0] = 'cc';
  a2[1] = 'dd';
  console.log(a1)
  console.log(a2)
  console.log([1,2,3].concat(a1).concat(a2))
};

// ...

export {
  createFunc,
  testFunc2,
  testFunc3,
  testFunc4,
  areaFunc,
  forFunc,
  testFunc5,
  testFunc6,
  demoFunc1,
  demoFunc2,
}
