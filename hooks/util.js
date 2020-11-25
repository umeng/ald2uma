 /**
  * 定义aop函数
  * @param {function} fn 原函数
  * @param {function} beforefn 前置钩子
  * @param {function} afterfn 后置钩子
  */
export function aop( fn, beforefn ,afterfn){ 
    return function(){
      typeof beforefn === 'function' && beforefn.apply(this,arguments);
      console.log('before');
      let res = fn.apply( this, arguments); 
      typeof afterfn === 'function' && afterfn.apply( this, arguments );
      console.log('after');
      return res;
    }
  }
