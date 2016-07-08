game.engine = () => {
  let engine = {};

  engine.initialize = ({canvas}) => {
    engine.canvas = canvas;
  };

  engine.logCanvas = () => { console.log(engine.canvas); };

  let renderService = () => {
    let render = {};

    render.spritesByColor = new Map();

    render.addSprite = (sprite) => {
      
    };

    return render;
  };

  engine.render = renderService();



  return engine;
};
