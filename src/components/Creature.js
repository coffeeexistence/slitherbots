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

let invertDirection = (direction) => {
  return {
    x: direction.x * -1,
    y: direction.y * -1
  };
};


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

    this.segmentDistance = 7;

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
    return 5+(this.length/20);
  }

  sprites() {
    return this.segments.map((segment) => {
      return segment.sprite;
    }).reverse();
  }

  newRootSegment() {
    let creature = this;

    let rootSegment = {
      type: 'root',
      child: null,
      position: {
        x: this.currentPosition.x,
        y: this.currentPosition.y
      },
      direction: {
        x: 0,
        y: 0
      },
      update: function() {
        this.updatePosition();
      },
      childPendingMoves: [],
      pendChildDirectionChange: function(direction) {
        if(this.child) {
          this.childPendingMoves.push({
            direction: direction,
            distance: 0
          });
        }
      },
      changeDirection: function(direction) {
        this.direction = direction;
        this.pendChildDirectionChange(direction);
        // console.log('new direction is', this.direction);
      },
      updatePosition: function() {
        this.position = moveDirection(this.position, this.direction);
      }
    };

    rootSegment.sprite = new Sprite({
      type: 'circle',
      parent: rootSegment,
      radius: creature.radius(),
      position: function() {
        return this.parent.position;
      },
      color: {r: 0, g: 0, b: 0}
    });

    return rootSegment;
  }

  newChildSegment({parent, colorModifier = 0}) {
    let creature = this;

    let segment = {
      type: 'child',
      parent: parent,
      childPendingMoves: [],
      pendChildDirectionChange: function(direction) {
        if(this.child) {
          this.childPendingMoves.push({
            direction: direction,
            distance: 0
          });
        }
      },
      changeDirection: function(direction) {
        this.direction = direction;
        this.pendChildDirectionChange(direction);
      },
      checkForMoves: function() {
        let segment = this;
        this.parent.childPendingMoves.forEach(function(move, index) {
          if(move.distance >= creature.segmentDistance) {
            segment.changeDirection(move.direction);

            segment.parent.childPendingMoves.splice(index, 1);
          } else {
            move.distance++;
          }
        });
      },
      direction: {x: 0,  y: 0},
      position: {
        x: parent.position.x,
        y: parent.position.y
      },
      update: function() {
        this.checkForMoves();
        this.updatePosition();
      },
      updatePosition: function() {
        this.position = moveDirection(this.position, this.direction) ;
      }
    };

    segment.sprite = new Sprite({
      type: 'circle',
      parent: segment,
      radius: creature.radius(),
      position: function() {
        return this.parent.position;
      },
      color: {
        r: creature.color.r,
        g: creature.color.g,
        b: creature.color.b
      },
      opacity: 1-colorModifier/2
    });

    parent.child = segment;

    return segment;
  }

  generateInitialSegments() {
    let creature = this;
    let initialAngle = 0;

    let rootSegment = this.newRootSegment();
    this.rootSegment = rootSegment;

    let segments = [rootSegment];

    for(let idx = 1; idx < this.length; idx++) {
      let childSegment = this.newChildSegment({
        parent: segments[segments.length-1],
        colorModifier: idx/this.length
      });
      childSegment.update();
      segments.push(childSegment);
    }

    return segments;
  }


}
