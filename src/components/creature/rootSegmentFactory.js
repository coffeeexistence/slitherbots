function rootSegmentFactory({startPosition, creature}) {
  let rootSegment = {
    type: 'root',
    child: null,
    position: {
      x: startPosition.x,
      y: startPosition.y
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
    color: {r: 100, g: 100, b: 100}
  });

  return rootSegment;
}
