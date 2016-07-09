class Creature {
  constructor({position={x:0, y:0}, color='red', length=10}) {
    switch(type) {
      case 'circle':
        this.draw = function(ctx) {
          ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        };
        break;
    }

    this.segmentPositions = [position];

    this.color = color;
    this.length = length;
  }

  radius() {
    return 10+(this.length/10);
  }

  segments() {
    let segmentSprites = [];
    this.segmentPositions.forEach(function(position){
      let newSegment = this.segment(position);
      segmentSprites.push(newSegment);
    });
  }

  segment(position) {
    return new Sprite({
      type: 'circle',
      radius: this.radius(),
      position: {x: position.x, y: position.y},
      color: 'blue'
    });
  }


}
