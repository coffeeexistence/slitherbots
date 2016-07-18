require('babel-register');


import { expect } from 'chai';

import Creature from '../src/components/creature/Creature';

describe('Creature', () => {

  it('should exist', () => {
    let creature = new Creature({});

    expect(creature).to.exist;
  });


  it('should have x/y of [0, 0] when initialized without startPosition', () => {
    const expectedXY = {x: 0, y: 0};
    let creature = new Creature({});
    let actualXY = creature.position();

    expect(actualXY).to.deep.equal(expectedXY);
  });


  it('should have 1 or more sprites', () => {
    let creature = new Creature({});
    let sprites = creature.sprites();

    expect(sprites.length).to.be.above(0);
  });

  it('should have a radius', () => {
    let creature = new Creature({});
    let radius = creature.radius();

    expect(radius).to.exist;
  });



});
