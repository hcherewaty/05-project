'use strict';

const darken = require('../transforms/darken.js');
const johndice = require('../transforms/johndice.js');
const random = require('../transforms/random.js');
const redscale = require('../transforms/redscale.js');

const getRandomNum = () => {
  return Math.floor(Math.random() * Math.floor(256));
  
};

let bmp = {
  colorArray: [],
};

for (let i=0; i < 100; i++) {
  bmp.colorArray.push(9);
}

let darkenColorArray = darken(bmp);
let johndiceColorArray = johndice(bmp);
let redScaleColorArray = redscale(bmp);

describe('transform modules', () => {
  describe('darken', () => {
    it('should darken the image by dividing each rgb value by 3', () => {
      let expectedB = bmp.colorArray[0]/3;
      let expectedG = bmp.colorArray[1]/3;
      let expectedR = bmp.colorArray[2]/3;

      let darkIndexB = darkenColorArray[0];
      let darkIndexG = darkenColorArray[1];
      let darkIndexR = darkenColorArray[2];

      expect(darkIndexB).toEqual(expectedB);
      expect(darkIndexG).toEqual(expectedG);
      expect(darkIndexR).toEqual(expectedR);
    });
  });

  describe('johndice', () => {
    it('should have the same level of yellow for every set of 4 color bits', () => {
      let expected = 0;
      let yellowIndex = johndiceColorArray[0];
      expect(yellowIndex).toEqual(expected);
    });
  });

  describe('random', () => {
    it('checking to make sure our random number is less than or equal to 255, and greater than 0', () => {
      let lowerBound = 0;
      let upperBound = 256;
      let expected = getRandomNum();
      expect(expected).toBeLessThan(upperBound);
      expect(expected).toBeGreaterThan(lowerBound);
    });
  });

  describe('redscale', () => {
    it('should have the same level of red for every set of 4 color bits', () => {
      let expected = 255;
      let redIndex = redScaleColorArray[2];
      expect(redIndex).toEqual(expected);
    });
  });
});