export default function () {
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

      ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

      let drawColorGroup = (sprites, color) => {
        sprites.reverse();
        sprites.forEach( (sprite) => {
          ctx.beginPath();
          sprite.draw(ctx);
          ctx.closePath();
        });

      };
      entitySpritesMap.forEach(drawColorGroup);
    };



    return render;
  };

  engine.render = renderService();

  return engine;
}
