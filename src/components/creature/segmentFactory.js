 export default function ({creature, startPosition}) {
  let segment = {
    creature: creature,
    childPendingMoves: [],
    position: startPosition
  };

  segment.pendChildDirectionChange = function(direction) {
    if(segment.child) {
      segment.childPendingMoves.push({
        direction: direction,
        distance: 0
      });
    }
  };

  segment.changeDirection = function(direction) {
    segment.direction = direction;
    segment.pendChildDirectionChange(direction);
    // console.log('new direction is', this.direction);
  };
  segment.updatePosition = function() {
    segment.position = moveDirection(segment.position, segment.direction);
  };

  segment.sprite = new Sprite({
    type: 'circle',
    parent: segment,
    radius: segment.creature.radius(),
    position: function() {
      return segment.position;
    },
    color: {r: creature.color.r, g: creature.color.g, b: creature.color.b}
  });

  return segment;

}
