/**
 * 基于类的测试： class
 */
/* eslint-disable  */
export default class Database {
  // es7 提案定义类的实例属性 -- 借助于babel的实现;
  title = 'sunxt';

  // es7 提案定义类的私有属性;
  static email = '506755679@qq.com';
  // 构造函数;
  constructor(phone, age) {
    this.phone = phone;
    this.age = age;
  }

  // 不可变属性 -- getter 和 setter;
  get type() {
    console.warn('固定的返回值：不可变属性')
    return '只有一种不可变类型';
  }

  get props1() {
    console.log(this.age)
    return this.age > 20 ? '成年人' : '未成年人'
  }

  set props1(age) {
    console.log(this.age)
    this.age = age
  }

  set type(type) {
    console.warn(`这不是个可变的属性, 不可set为：${type}`);
  }

  static get fixedType() {
    console.warn('固定的不可变属性');
    return '静态的不可变属性';
  }
  static set fixedType(type) {
    console.warn(`固定的不可变属性: ${type}不可变`);
  }

  static get staticProp1() {
    // console.log(this.title)  // 无法获取到实例属性;
    // console.log(this) --- this指向class 类;
    console.log(`class上的static属性email: ${this.email}`)
    return this._count ? this._count : 1111;
  }

  static set staticProp1(count) {
    // this指向class 类， this._count是类上的静态属性，未明确定义;
    this._count = count
  }

  // 实例方法;
  sayHi(msg) {
    console.log(`Hello, ${msg}, 实例方法中的实例属性title： ${this.title}`);
  }

  // 静态方法;
  static say() {
    console.log(`Hello, 静态方法中的实例属性title： ${this.title}`);
  }

  changTitle(title) {
    this.title = title;
  }

  changeType(type) {
    this.type = type;
  }

  // 静态方法中 的 this, 访问实例属性的测试
  // tips: this 指向 Class 类本身，和 实例无关，也无法访问到实例的属性
  static staticMethod() {
    console.log(this)
    console.log(this.title)
    console.log(this.email)
  }

  // 实例方法中, this 访问属性测试
  // tips: this 指向实例， 可以访问实例属性，同时可以通过 类本身来访问类的静态属性
  instanceMethod() {
    console.log(this)
    console.log(this.title)
    console.log(Database.email)
  }
}

// tips: 定义静态属性 -- 简单的方法;
Database.extraProps = '这是传统的静态属性';

// tips: class中方法的枚举;
// 1. class 类的内部所有定义的方法，都是不可枚举的（non-enumerable, 这一点与 ES5 的行为不一致。
Object.keys(Database.prototype);   //  []
Object.getOwnPropertyNames(Database.prototype);  //  ["constructor","sayHi", "changTitle"], 只有实例方法;
// console.log(Object.keys(Database.prototype))   // []
// console.log(Object.getOwnPropertyNames(Database.prototype))   ["constructor", "sayHi", "changTitle"]

// 往class 类上添加新的方法;
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
Object.assign(Database.prototype, {
  toString() {
    console.log('新添加的方法---toString');
  },
  toVal() {
    console.log('新添加的方法--toVal');
  },
})

// 严格按照顺序执行;
// console.log(Object.getOwnPropertyNames(Database.prototype));  //  ["constructor", "sayHi", "changTitle", "toString", "toVal"]



// Demo1 -- 画圆;
class Circle {
  constructor(radius) {
      this.radius = radius;
      Circle.circlesMade++;
  }

  static draw(circle, canvas) {
      // Canvas绘制代码
      console.log('静态方法')
  }

  static get circlesMade() {
      return !this._count ? 0 : this._count;
  }

  static set circlesMade(val) {
      this._count = val;
  }

  area() {
      return Math.pow(this.radius, 2) * Math.PI;
  }

  get radius() {
      return this._radius;
  }

  set radius(radius) {
      if (!Number.isInteger(radius))
          throw new Error("圆的半径必须为整数。");
      this._radius = radius;
  }

  static staticMethod() {
    console.log('静态方法')
    console.log(`实例属性：${this.radius}`)
  }
}
