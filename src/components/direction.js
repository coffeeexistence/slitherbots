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
