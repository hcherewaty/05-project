![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## 05 - Bitmap - Project

### Author: Heather Cherewaty & Jacob Anderson

### Links and Resources
[![Build Status](https://www.travis-ci.com/hcherewaty/05-project.svg?branch=master)](https://www.travis-ci.com/hcherewaty/05-project)

* [repo](https://github.com/hcherewaty/05-project)
* [travis](https://www.travis-ci.com/hcherewaty/05-project)


### Modules
#### `index.js`
##### Exported Values and Methods
* `darken.js` - returns and saves a bmp file to assets folder that darkens the baldy.bmp image by taking the average of the rgb values.
* `johndice.js` - returns and saves a bmp file to assets folder that turns the entire baldy.bmp image yellow by setting every fourth byte in the array index to 0.
* `random.js` - returns and saves a bmp file to assets folder that consists of random colors by way of a random number generator input into the color array.
* `redscale.js` - returns and saves a bmp file to assets folder that sets the overall color of the baldy.bmp iamge to redscale by manipulating the the color array "r" value of rgb.

### Setup
#### `.env` requirements
* `PORT` - Defined in ENV

#### Running the app
* `npm start`
* Endpoint: `/`
  * Returns and saves a new bmp file to the assets folder

#### Tests
* npm test (runs unit tests)
* npm run lint (runs linter tests)
* tests check if transform functions modify the test array at specific points to achieve the desired tansform.

#### `const [file, operation] = process.argv.slice(2);` explanation
* `process.argv` is a node.js property that when invoked will return an array that contains the command line arguements passed in when launching a node.js process.
* `slice(2)` we include this at the end of process.argv to remove the path node itself and to our script.
*  `const [file, operation]` signifies that when launching the node.js process we will need to take in a file and an operation; i.e. `node.js ./assets/baldy.bmp redscale` to run baldy.bmp through our redscale transformer.


