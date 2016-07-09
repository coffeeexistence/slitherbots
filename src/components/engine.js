let engineService = () => {
  let engine = {};

  engine.initialize = ({canvas}) => {
    engine.canvas = canvas;
  };

  engine.logCanvas = () => { console.log(engine.canvas); };

  let renderService = () => {
    let render = {};




    let addSprite = (sprite, spriteMap) => {
      if(!spriteMap.has(sprite.color)){
        spriteMap.set(sprite.color, []);
      }
      spriteMap.get(sprite.color).push(sprite);
    };

    let addSprites = (sprites, spriteMap) => {
      sprites.forEach((sprite)=>{
        addSprite(sprite, spriteMap);
      });
    };



    let entities = {
      all: []
    };

    entities.sprites = function() {
      let spritesMap = new Map();
      this.all.forEach((entity) => {
        addSprites(entity.sprites, spritesMap);
      });
      return spritesMap;
    };

    render.addEntity = (entity) => { entities.all.push(entity); };




    render.update = () => {
      let spritesMap = entities.sprites();
      let ctx = engine.canvas.getContext('2d');
      let drawColorGroup = (spritesMap, color) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        spritesMap.forEach( (sprite) => {
          sprite.draw(ctx);
        });
        ctx.fill();
        ctx.closePath();
      };
      spritesMap.forEach(drawColorGroup);
    };



    return render;
  };

  engine.render = renderService();

  return engine;
};

game.engine = engineService();
