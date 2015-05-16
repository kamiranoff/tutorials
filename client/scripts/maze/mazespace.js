'use strict';

//Maze Space Object
function Mazespace() {
  this.north = false;
  this.east = false;
  this.south = false;
  this.west = false;
}

Mazespace.prototype.setWall = function(direction) {
  this[direction] = true;
};

