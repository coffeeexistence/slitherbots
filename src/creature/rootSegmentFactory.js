import segmentFactory from './segmentFactory';

export default function ({startPosition, creature}) {
  let rootSegment = segmentFactory({startPosition: startPosition, creature: creature});

  rootSegment.type = 'root';
  rootSegment.child = null;
  rootSegment.direction = {x: 0, y: 0};
  rootSegment.update = function() { rootSegment.updatePosition(); };

  return rootSegment;
}
