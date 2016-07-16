function angleToDirection ({angle, distance}) {
  let direction = ((angle/360) * Math.PI) - Math.PI/2;
  // console.log(direction);
  return {
    x: (distance * Math.cos(direction)),
    y: (distance * Math.sin(direction))
  };
}

function moveDirection (start, movement) {
  return {
    x: start.x + movement.x,
    y: start.y + movement.y
  };
}

function invertDirection (direction) {
  return {
    x: direction.x * -1,
    y: direction.y * -1
  };
}


class Creature {
  constructor({
    position={x:0, y:0},
    color={r:255, g:0, b:0},
    length=10,
    direction=0,
    autonomous=false,
    thinkInterval=100
    })
  {

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.segmentDistance = 9;

    this.color = color;

    this.stepDistance = 1;
    this.angle = direction;
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
    this.currentAngle = angle;
    let newDirection = angleToDirection({angle: angle, distance: this.stepDistance});
    this.rootSegment.changeDirection(newDirection);
  }

  think() {
    if(this.brain.thinkStep > this.brain.thinkInterval) {
      this.brain.thinkStep = 0;
      let newDirection = parseInt((Math.random() * 720)-360);
      this.updateDirection(newDirection+this.angle);
    } else {
      this.brain.thinkStep++;
    }

  }

  radius() {
    return 8+(this.length/20);
  }

  sprites() {
    return this.segments.map((segment) => {
      return segment.sprite;
    }).reverse();
  }


  generateInitialSegments() {
    let creature = this;
    let initialAngle = 0;

    let rootSegment = rootSegmentFactory({
      startPosition: {x: this.currentPosition.x, y: this.currentPosition.y},
      creature: creature
    });
    this.rootSegment = rootSegment;

    console.log('root segment created');

    let segments = [rootSegment];

    for(let idx = 1; idx < this.length; idx++) {
      let childSegment = childSegmentFactory({
        creature: creature,
        parent: segments[segments.length-1],
        colorModifier: idx/this.length
      });
      childSegment.update();
      console.log('updated child segment');
      segments.push(childSegment);
    }

    console.log('initial segments generated');

    return segments;
  }


}
