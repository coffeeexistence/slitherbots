function childSegmentFactory({parent, colorModifier = 0, creature}) {
    let startPosition = {x: parent.position.x, y: parent.position.y};
    let segment = segmentFactory({startPosition: startPosition, creature: creature});

    segment.type ='child';
    segment.parent = parent;
    segment.checkForMoves = function() {
      segment.parent.childPendingMoves.forEach(function(move, index) {
        if(move.distance >= creature.segmentDistance) {
          segment.changeDirection(move.direction);

          segment.parent.childPendingMoves.splice(index, 1);
        } else {
          move.distance++;
        }
      });
    };
    segment.direction = {x: 0,  y: 0};

    segment.update = function() {
      this.checkForMoves();
      this.updatePosition();
    };

  parent.child = segment;

  return segment;
}
