'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.size = buffer.readInt32LE(2);
  this.offset = buffer.readInt32LE(10);
  this.headerSize = buffer.readInt32LE(14);
  this.width = buffer.readInt32LE(18);
  this.height = buffer.readInt32LE(22);
  this.bitPerPixel = buffer.readInt16LE(28);
  this.colorArray = buffer.slice(54, this.offset);
  this.pixelArray = buffer.slice(1078);
  if(! this.colorArray.length) {
    throw 'Invalid . bmp format';
  }
  //... and so on
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */

const getRandomNum = () => {
  return Math.floor(Math.random() * Math.floor(256));
};

const darkJohn = (bmp) => {
  if(! bmp.colorArray.length) throw 'must pass valid bmp object';

  for (let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i] = bmp.colorArray[i] / 3;
    bmp.colorArray[i + 1] = bmp.colorArray[i + 1] / 3;
    bmp.colorArray[i + 2] = bmp.colorArray[i + 2] / 3;
  }
};

const doRandom = (bmp) => {
  if(! bmp.colorArray.length) throw 'must pass valid bmp object';

  for (let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i] = getRandomNum();
    bmp.colorArray[i + 1] = getRandomNum();
    bmp.colorArray[i + 2] = getRandomNum();
  }
};


// console.log('Transforming bitmap into greyscale', bmp);

//TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

//TODO: alter bmp to make the image greyscale ...

const doRedScale = (bmp) => {
  if(! bmp.colorArray.length) throw 'must pass valid bmp object';

  for (let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i + 2] = 255;
  }
};

const doJohndice = (bmp) => {
  if(! bmp.colorArray.length) throw 'must pass valid bmp object';

  for (let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i] = 0;
  }
};

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  darken: darkJohn,
  redscale: doRedScale,
  johndice: doJohndice,
  random: doRandom,
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();