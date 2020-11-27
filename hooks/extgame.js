import uma from "umtrack-wx-game";
const JOINCHAR = ".";
const PREFIX = "_um";
const REVENUE = "revenue";
const STAGE = "stage";
const ON_START = "start";
const ON_RUNNING = "running";
const ON_END = "end";
const STAGE_START = [PREFIX, STAGE, ON_START].join(JOINCHAR);
const STAGE_END = [PREFIX, STAGE, ON_END].join(JOINCHAR);

uma.revenue = function (data) {
  uma.trackEvent([PREFIX, REVENUE, data.group].join(JOINCHAR), data);
};
uma.stage = {
  onStart: function (data) {
    uma.trackEvent(STAGE_START, data);
  },
  onEnd: function (data) {
    uma.trackEvent(STAGE_END, data);
  },
  onRunning: function (data) {
    uma.trackEvent(
      [PREFIX, STAGE, ON_RUNNING, data.event].join(JOINCHAR),
      data
    );
  },
};
