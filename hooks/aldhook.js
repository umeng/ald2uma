import { aop } from "./util";
/**
 * 自动适配阿拉丁
 * @param {object} context 当前小程序顶级对象
 * @param {object} uma 友盟sdk的uma对象
 * @returns {arrary}  [context, uma]
 */
const aldOnShareAppMessage = "aldOnShareAppMessage";
const aldShareAppMessage = "aldShareAppMessage";
const aldSendEvent = "aldSendEvent";
const aldRevenue = "aldRevenue";
export function hookAld(context, uma) {
  let topfns = [
    aldOnShareAppMessage,
    aldShareAppMessage,
    aldSendEvent,
    aldRevenue,
  ];
  for (let i = 0; i < topfns.length; i++) {
    let topfn = topfns[i];
    context[topfn] = aop(context[topfn] || function () {}, function (...args) {
      switch (topfn) {
        case aldSendEvent:
          uma.trackEvent(...args);
          break;
        case aldRevenue:
          uma.revenue(...args);
          break;
        case aldOnShareAppMessage:
          uma.onShareAppMessage(...args);
          break;
        case aldShareAppMessage:
          uma.shareAppMessage(...args);
          break;
      }
    });
  }

  var oldStage = context.aldStage;
  context.aldStage = {
    onStart: aop(oldStage ? oldStage.onStart : function () {}, function (
      ...args
    ) {
      uma.stage.onStart(...args);
    }),
    onRunning: aop(oldStage ? oldStage.onRunning : function () {}, function (
      ...args
    ) {
      uma.stage.onRunning(...args);
    }),
    onEnd: aop(oldStage ? oldStage.onEnd : function () {}, function (...args) {
      uma.stage.onStart(...args);
    }),
  };
  var oldLevel = context.aldLevel;
  context.aldLevel = {
    onInitLevel: aop(
      oldLevel ? oldStage.onInitLevel : function () {},
      function (...args) {
        uma.level.onInitLevel(...args);
      }
    ),
    onSetLevel: aop(oldLevel ? oldStage.onSetLevel : function () {}, function (
      ...args
    ) {
      uma.level.onSetLevel(...args);
    }),
  };
  return [context, uma];
}
