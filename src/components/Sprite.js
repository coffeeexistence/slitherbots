class Sprite {
  constructor({type, position, color={r: 255, g: 0, b: 0}, opacity=1, radius=40, parent}) {
    this.type = type;
    this.parent = parent;
    this.position = position;
    this.color = color;
    this.opacity = opacity;
    this.radius = radius;
  }

  rgbaValue() {
    return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b},  ${this.opacity})`;
  }

  drawCircle(ctx) {
    ctx.fillStyle = this.rgbaValue();
    if(!this.position) {console.log(this);}
    ctx.arc(this.position().x, this.position().y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }

  draw(ctx) {
    switch(this.type) {
      case 'circle':
        this.drawCircle(ctx);
        break;
      case 'circle-gradient':
        this.drawCircleGradient(ctx);
        break;
    }
  }
}
