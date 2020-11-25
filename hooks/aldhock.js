import { aop } from './util';
/**
 * 自动hook阿拉丁
 * @param {object} context 当前小程序顶级对象
 * @param {object} uma 友盟sdk的uma对象
 */
export function hookAld(context,uma){
    let topfns =['aldOnShareAppMessage','aldShareAppMessage','aldSendEvent'];
    for(let i=0;i<topfns.length;i++){
        let topfn = topfns[i];
         context[topfn] = aop(context[topfn]||function(){},function(...args){
            uma.trackEvent(...args);
        })
    }
}