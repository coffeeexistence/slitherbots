let directionHelper = {};

directionHelper.invert = (direction) => {
  return {
    x: direction.x * -1,
    y: direction.y * -1
  };
};

directionHelper.move = (start, movement) => {
  return {
    x: start.x + movement.x,
    y: start.y + movement.y
  };
};

directionHelper.angleToDirection = ({angle, distance}) => {
  let direction = ((angle/360) * Math.PI) - Math.PI/2;
  return {
    x: (distance * Math.cos(direction)),
    y: (distance * Math.sin(direction))
  };
};

export default directionHelper;
