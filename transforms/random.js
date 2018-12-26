'use strict';
const getRandomNum = () => {
  return Math.floor(Math.random() * Math.floor(256));
};
module.exports = (bmp) => {
  if( !bmp.colorArray.length ) throw 'must pass valid bmp object';

  for (let i = 0; i < bmp.colorArray.length; i+= 4) {
    bmp.colorArray[i] = getRandomNum();
    bmp.colorArray[i + 1] = getRandomNum();
    bmp.colorArray[i + 2] = getRandomNum();
  }
};
