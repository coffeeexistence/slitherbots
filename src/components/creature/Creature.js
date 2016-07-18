import childSegmentFactory from './childSegmentFactory';
import rootSegmentFactory from './rootSegmentFactory';
import directionHelper from '../helpers/direction';
import colorHelper from '../helpers/color';


export default class {
  constructor({
    position={x:0, y:0},
    color=colorHelper.pastel.random(),
    length=10,
    direction=0,
    autonomous=false,
    thinkInterval=100
    })
  {

    this.currentPosition = position;
    this.segmentPositions = [position];

    this.segmentDistance = 6;

    this.color = color;

    this.stepDistance = 1;
    this.angle = direction;
    this.direction = directionHelper.angleToDirection({angle: direction, distance: this.stepDistance});

    this.length = length;

    if(autonomous) {
      this.autonomous = true;
      this.brain = {};
      this.brain.thinkInterval = thinkInterval;
      this.brain.thinkStep = 0;
    }

    this.segments = this.generateInitialSegments();
  }

  position() {
    return this.currentPosition;
  }

  update() {
    if(this.autonomous) {
      this.think();
    }
    this.segments.forEach((segment) => {
      segment.update();
    });
  }

  updateDirection(angle) {
    this.currentAngle = angle;
    let newDirection = directionHelper.angleToDirection({angle: angle, distance: this.stepDistance});
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
    return 3+(this.length/15);
  }

  sprites() {
    let spriteArr = this.segments.map((segment) => {
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

    let segments = [rootSegment];

    for(let idx = 1; idx < this.length; idx++) {
      let childSegment = childSegmentFactory({
        creature: creature,
        parent: segments[segments.length-1],
        colorModifier: idx/this.length
      });
      childSegment.update();

      segments.push(childSegment);
    }


    return segments;
  }


}
