require('babel-register');


import { expect } from 'chai';

import Creature from '../src/components/creature/Creature';

describe('Creature', () => {

  it('should exist', () => {
    let creature = new Creature({});

    expect(creature).to.exist;
  });



  it('should have have x/y of 0/0 when initialized without startPosition', () => {
    const expectedXY = {x: 0, y: 0};
    let creature = new Creature({});
    let actualXY = creature.position();

    expect(actualXY).to.deep.equal(expectedXY);
  });
});
