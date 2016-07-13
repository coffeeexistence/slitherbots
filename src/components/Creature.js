let angleToDirection = ({angle, distance}) => {
  let direction = ((angle/360) * Math.PI) - Math.PI/2;
  // console.log(direction);
  return {
    x: (distance * Math.cos(direction)),
    y: (distance * Math.sin(direction))
  };
};


class Creature {
  constructor({
    position={x:0, y:0},
    color={r:255, g:0, b:0},
    length=10,
    direction=90,
    autonomous=false,
    thinkInterval=100
    })
  {

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.color = color;

    this.stepDistance = 1;
    this.direction = angleToDirection({angle: direction, distance: this.stepDistance});

    this.length = length;

    if(autonomous) {
      this.autonomous = true;
      this.brain = {};
      this.brain.thinkInterval = thinkInterval;
      this.brain.thinkStep = 0;
    }

  }

  move() {
    if(this.autonomous) {
      this.think();
    }
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

  think() {
    if(this.brain.thinkStep > this.brain.thinkInterval) {
      this.brain.thinkStep = 0;
      let newDirection = parseInt((Math.random() * 720)-360);
      console.log("i decided to go", newDirection);
      this.updateDirection(newDirection);
      console.log("new direction is", this.direction);
    } else {
      this.brain.thinkStep++;
    }

  }

  radius() {
    return 5+(this.length/20);
  }

  sprites() {
    return this.segments();
  }

  segment(position, opacity=1) {
    return new Sprite({
      type: 'circle',
      radius: this.radius(),
      position: {x: position.x, y: position.y},
      color: this.color,
      opacity: opacity
    });
  }

  segments() {
    let creature = this;
    let length = this.length;
    return this.segmentPositions.map(function(position, index){
      let segmentOpacity = (length-index)/length;
      return creature.segment(position, segmentOpacity);
    });
  }


}
