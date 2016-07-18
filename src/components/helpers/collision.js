let collisionHelper = {};

collisionHelper.circles = (circle0, circle1) => {
  return {

    contact: () => {
      let requiredDistance = circle0.radius + circle1.radius;
      // If the distance is less or equal to this, there is a collision

      let actualDistance = Math.sqrt(
        Math.pow((circle1.x - circle0.x), 2) + Math.pow((circle1.y - circle0.y), 2)
      );

      return (actualDistance < requiredDistance);
    }

  };
};






export default collisionHelper;
