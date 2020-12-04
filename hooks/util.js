 /**
  * 定义aop函数
  * @param {function} fn 原函数
  * @param {function} beforefn 前置钩子
  * @param {function} afterfn 后置钩子
  */
 export function aop(fn, beforefn, afterfn) {
    return function (...args) {
      typeof beforefn === 'function' && beforefn.apply(this, args);
      console.log('before');
      let res = fn.apply(this, args);
      typeof afterfn === 'function' && afterfn.apply(this, args);
      console.log('after');
      return res;
    }
  }
 