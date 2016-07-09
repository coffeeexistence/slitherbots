let angleToDirection = ({angle, distance}) => {
  return {
    x: (distance * Math.cos(angle)),
    y: (distance * Math.sin(angle))
  };
};

class Creature {
  constructor({position={x:0, y:0}, color='red', length=10, direction}) {

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.color = color;

    this.stepDistance = 1;
    this.direction = angleToDirection({angle: direction, distance: this.stepDistance});

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

  updateDirection(angle) {
    let newDirection = angleToDirection({angle: angle, distance: this.stepDistance});
    this.direction = newDirection;
  }

  radius() {
    return 5+(this.length/10);
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
