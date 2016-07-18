export default function(drawInterval) {
  return {
    interval: drawInterval,
    nextInterval: function() {
      this.iteration = 0;
      this.intervalStart = new Date();
    },
    iteration: 0,
    intervalStart: new Date(),
    intervalTime: function() {
      let timePerInterval = (new Date() - this.intervalStart);
      let updatesPerSecond = this.interval * (1000/timePerInterval);
      console.log("updates per second:", Math.ceil(updatesPerSecond));
    }
  };
}
