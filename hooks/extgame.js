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
const STAGE_END = [PREFIX, STAGE, ON_END].join(JOINCHAR);

uma.revenue = function (data) {
  uma.trackEvent([PREFIX, REVENUE, data.group].join(JOINCHAR), data);
};
var stagestarttime = 0;
uma.stage = {
  onStart: function (data) {
    stagestarttime = Date.now();
    uma.trackEvent(STAGE_START, data);
  },
  onEnd: function (data) {
    data._um_sdu = stagestarttime !== 0 ? Date.now() - stagestarttime : 0;
    uma.trackEvent(STAGE_END, data);
  },
  onRunning: function (data) {
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
    uma.trackEvent([PREFIX, STAGE, ON_RUNNING, data.event].join(JOINCHAR), ndt);
  },
};
uma.level = {
    onInitLevel: function(data){
        uma.trackEvent([PREFIX,LEVEL,ON_INIT].join(JOINCHAR),data);
    },
    onSetLevel: function(data){
        uma.trackEvent([PREFIX,LEVEL,ON_SET].join(JOINCHAR),data);
    }
}
export default uma;