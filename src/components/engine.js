let engineService = () => {
  let engine = {};

  engine.initialize = ({canvas}) => {
    engine.canvas = canvas;
  };

  engine.logCanvas = () => { console.log(engine.canvas); };

  let renderService = () => {
    let render = {};

    let spritesByColor = new Map();

    render.addSprite = (sprite) => {
      if(!spritesByColor.has(sprite.color)){
        spritesByColor.set(sprite.color, []);
      }
      spritesByColor.get(sprite.color).push(sprite);
    };

    render.update = () => {
      let ctx = engine.canvas.getContext('2d');
      let drawColorGroup = (sprites, color) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        sprites.forEach( (sprite) => {
          sprite.draw(ctx);
        });
        ctx.fill();
        ctx.closePath();
      };
      spritesByColor.forEach(drawColorGroup);
    };

    return render;
  };

  engine.render = renderService();



  return engine;
};

game.engine = engineService();
