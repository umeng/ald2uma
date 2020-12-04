import uma from "umtrack-wx-game";
const JOINCHAR = ".";
const PREFIX = "_um";
const REVENUE = "revenue";
const STAGE = "stage";
const LEVEL = "level";
const ON_START = "start";
const ON_RUNNING = "running";
const ON_END = "end";
const ON_INIT = "init";
const ON_SET = "set";
const STAGE_START = [PREFIX, STAGE, ON_START].join(JOINCHAR);

/**
 * 参数扁平化
 * @param {object} data 
 */
function _flatData(data){
    var ndt = {};
    for (var dt in data) {
      var tdt = data[dt];
      if (typeof tdt === "object") {
        for (var obj in tdt) {
          ndt[dt + JOINCHAR + obj] = tdt[obj];
        }
      } else {
        ndt[dt] = tdt;
      }
    }
    return ndt;
}
uma.revenue = function (data) {
  uma.trackEvent([PREFIX, REVENUE, data.group].join(JOINCHAR), _flatData(data));
};
var stageStartTime = 0;
uma.stage = {
  onStart: function (data) {
    stageStartTime = Date.now();
    uma.trackEvent(STAGE_START, _flatData(data));
  },
  onEnd: function (data) {
    data._um_sdu = (stageStartTime !== 0 ? Date.now() - stageStartTime : 0);
    uma.trackEvent([PREFIX, STAGE, ON_END, data.event].join(JOINCHAR), _flatData(data));
  },
  onRunning: function (data) {
    uma.trackEvent([PREFIX, STAGE, ON_RUNNING, data.event].join(JOINCHAR), _flatData(data));
  },
};
uma.level = {
    onInitLevel: function(data){
        uma.trackEvent([PREFIX,LEVEL,ON_INIT].join(JOINCHAR),_flatData(data));
    },
    onSetLevel: function(data){
        uma.trackEvent([PREFIX,LEVEL,ON_SET].join(JOINCHAR),_flatData(data));
    }
}
export default uma;