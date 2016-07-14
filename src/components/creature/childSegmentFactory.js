function childSegmentFactory({parent, colorModifier = 0, creature}) {
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
