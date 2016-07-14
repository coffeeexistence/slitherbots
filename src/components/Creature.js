let angleToDirection = ({angle, distance}) => {
  let direction = ((angle/360) * Math.PI) - Math.PI/2;
  // console.log(direction);
  return {
    x: (distance * Math.cos(direction)),
    y: (distance * Math.sin(direction))
  };
};

let moveDirection = (start, movement) => {
  return {
    x: start.x + movement.x,
    y: start.y + movement.y
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

    this.segmentDistance = 5;

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

    this.segments = this.generateInitialSegments();

  }

  move() {
    if(this.autonomous) {
      this.think();
    }
    this.segments.forEach((segment) => {
      segment.update();
    });
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
    return this.segments.map((segment) => {
      return segment.sprite;
    });
  }

  newRootSegment() {
    let creature = this;
    return {
      position: creature.currentPosition,
      direction: creature.direction,
      update: function() {},
      sprite: new Sprite({
        type: 'circle',
        radius: this.radius(),
        position: this.position,
        color: this.color
      })
    };
  }

  newChildSegment({parent}) {
    let creature = this;
    return {
      parent: parent,
      direction: parent.direction,
      position: {},
      update: function() {
        this.updatePosition();
      },
      updatePosition: function() {
        this.position = moveDirection(parent.position, this.direction);
      },
      sprite: new Sprite({
        type: 'circle',
        radius: creature.radius(),
        position: this.position,
        color: creature.color,
      })
    };
  }

  generateInitialSegments() {
    let creature = this;
    let initialAngle = 90;

    let rootSegment = this.newRootSegment();
    let segments = [rootSegment];

    for(let idx = 1; idx < this.length; i++) {
      let childSegment = this.newChildSegment({
        parent: segments[segments.length-1]
      });
      childSegment.update();
      segments.push(childSegment);
    }

    return segments;
  }


}
