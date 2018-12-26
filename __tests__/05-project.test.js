'use strict';

// const darken = require('../transforms/darken.js');
// const johndice = require('../transforms/johndice.js');
// const random = require('../transforms/random.js');
const redscale = require('../transforms/redscale.js');


let testColorArray = [];

for (let i=0; i < 100; i++) {
  testColorArray.push(0);
}

// let darkenColorArray = darken(testColorArray);
// let johndiceColorArray = johndice(testColorArray);
// let randomColorArray = random(testColorArray);
let redScaleColorArray = redscale(testColorArray);

describe('transform modules', () => {
  describe('darken', () => {

  });

  describe('johndice', () => {

  });

  describe('random', () => {

  });

  describe('redscale', () => {
    it('should have the same level of red for every set of 4 color bits', () => {
      let expected = 255;
      let redIndex = redScaleColorArray[2];
      expect(redIndex).toEqual(expected);
    });
  });
});