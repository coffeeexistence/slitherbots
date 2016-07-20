export default function(drawInterval, showFps) {

  let draw = {
    drawInterval: drawInterval,
    count: 0,
    intervalStartTime: new Date()
  };

  draw.resetCount = () => {
    draw.count = 0;
    draw.intervalStart = new Date();
  };

  draw.logTime = () => {
    let timePerInterval = (new Date() - draw.intervalStartTime);
    let updatesPerSecond = draw.count * (1000/timePerInterval);
    console.log("updates per second:", Math.ceil(updatesPerSecond));
  };

  draw.update = () => {
    if(draw.count > draw.drawInterval-1) {
      if(showFps) draw.logTime();
      draw.resetCount();
      return true;
    } else {
      draw.count++;
      return false;
    }
  };

  return draw;


}
