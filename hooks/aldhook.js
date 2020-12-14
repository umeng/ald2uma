import { aop } from "./util";
/**
 * 自动适配阿拉丁小游戏
 * @param {object} context 当前小程序顶级对象比如wx、qq、tt、swan、my
 * @param {object} uma 友盟sdk的uma对象
 * @returns {arrary}  [context, uma]
 */
export function hookAld(context, uma) {
  function _wrapSubFns(source, target, sourceMethods, targetMethods,sourceArgs,targetArgs) {
    let oldSource = source;
    for (let i = 0; i < sourceMethods.length; i++) {
      let sourceMethod = sourceMethods[i];
      let targetMethod = targetMethods ? targetMethods[i] : false;
      source[sourceMethod] = aop(oldSource ? oldSource[sourceMethod] : function () {}, function (...args) {
        if(sourceArgs&&targetArgs){
          for(let j =0;j<sourceArgs.length;j++){
             if(typeof args[targetArgs[i]]==='undefined' && typeof args[sourceArgs[i]] !== 'undefined'){
                args[targetArgs[i]] = args[sourceArgs[i]];
             }
          }
        }
        if (targetMethod) {
          return target[targetMethod](...args);
        } else {
          return target[sourceMethod](...args);
        }
      })
    }
  }
  
  _wrapSubFns(wx,uma,['aldSendEvent','aldRevenue','aldOnShareAppMessage','aldShareAppMessage'],['trackEvent','revenue','onShareAppMessage','shareAppMessage'])
  _wrapSubFns(context.aldStage,uma.stage,['onStart','onRunning','onEnd']);
  _wrapSubFns(context.aldLevel,uma.level,['onInitLevel','onSetLevel'],false,['stageId','stageName'],['levelId','levelName']);
  return [context, uma];
}
