export default class {
  constructor({type, position, color={r: 255, g: 0, b: 0}, opacity=1, radius=40, parent}) {
    this.type = type;
    this.parent = parent;
    this.position = position;
    this.color = color;
    this.opacity = opacity;
    this.radius = radius;
  }

  rgbaValue(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b},  ${opacity})`;
  }

  drawCircle(ctx) {
    ctx.fillStyle = this.rgbaValue(this.color, 1);
    if(!this.position) {console.log(this);}
    ctx.arc(this.position().x, this.position().y, this.radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.lineWidth = 1;
    let strokeColor = this.rgbaValue({
      r: parseInt(this.color.r/3),
      g: parseInt(this.color.g/3),
      b: parseInt(this.color.b/3)
    }, 1);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
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
