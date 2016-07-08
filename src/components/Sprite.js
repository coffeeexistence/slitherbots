class Sprite {
  constructor({type, position, color, radius=40}) {
    switch(type) {
      case 'circle':
        this.draw = function(ctx) {
          ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        };
        break;
    }
    this.type = type;
    this.position = position;
    this.color = color;
    this.radius = radius;
  }
}
