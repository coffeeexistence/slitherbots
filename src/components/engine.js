let engineService = () => {
  let engine = {};

  engine.initialize = ({canvas}) => {
    engine.canvas = canvas;
  };

  engine.logCanvas = () => { console.log(engine.canvas); };

  let renderService = () => {
    let render = {};



    let addSprite = (sprite, spriteMap) => {
      console.log(sprite);
      if(!spriteMap.has(sprite.color)){
        spriteMap.set(sprite.color, []);
      }
      spriteMap.get(sprite.color).push(sprite);
      console.log(spriteMap.get(sprite.color));
    };

    let addSprites = (sprites, spriteMap) => {
      sprites.forEach((sprite)=>{
        addSprite(sprite, spriteMap);
      });
    };



    let entities = {
      all: []
    };

    entities.sprites = () => {
      let spritesMap = new Map();
      entities.all.forEach((entity) => {
        addSprites(entity.sprites(), spritesMap);
      });
      // console.log(spritesMap.values());
      return spritesMap;
    };

    entities.update = () => {
      entities.all.forEach((entity) => {
        entity.move();
      });
    };

    render.addEntity = (entity) => { entities.all.push(entity); };




    render.update = () => {
      entities.update();
      let entitySpritesMap = entities.sprites();

      let ctx = engine.canvas.getContext('2d');
      let drawColorGroup = (sprites, color) => {
        console.log(color);
        ctx.beginPath();
        ctx.fillStyle = color;
        sprites.forEach( (sprite) => {
          sprite.draw(ctx);
        });
        ctx.fill();
        ctx.closePath();
      };
      entitySpritesMap.forEach(drawColorGroup);
    };



    return render;
  };

  engine.render = renderService();

  return engine;
};

game.engine = engineService();
