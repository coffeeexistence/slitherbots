class Creature {
  constructor({position={x:0, y:0}, color='red', length=10, direction={x:1, y:0.5}}) {

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.color = color;
    this.direction = direction;
    this.length = length;
  }

  move() {
    let newSegmentPosition = {
      x: (this.currentPosition.x += this.direction.x),
      y: (this.currentPosition.y += this.direction.y),
    };
    this.segmentPositions.unshift(newSegmentPosition);
    if(this.segmentPositions.length > this.length) {
      this.segmentPositions.pop();
    }
  }

  radius() {
    return 10+(this.length/10);
  }

  sprites() {
    return this.segments();
  }

  segment(position) {
    return new Sprite({
      type: 'circle',
      radius: this.radius(),
      position: {x: position.x, y: position.y},
      color: this.color
    });
  }

  segments() {
    let creature = this;
    return this.segmentPositions.map(function(position){
      return creature.segment(position);
    });
  }


}
