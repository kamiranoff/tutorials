/**
 *
 * Watching Object Oriented Javascript (tutorials/javascript/vanilla/)
 * part 1 (36min)
 **/
'use strict';


//Maze Object
function Maze(width, height) {


  this.width = width;
  this.height = height;

  this.startX = null;
  this.startY = null;
  this.startOrientation = null;

  this.endX = null;
  this.endY = null;

  this.directions = ["north", "east", "south", 'west'];
  this.spaces = [];

  var x, y;
  for (x = 1; x <= width; x += 1) {
    this.spaces[x] = [];
    for (y = 1; y <= height; y += 1) {
      this.spaces[x][y] = new Mazespace(this.directions);
    }
  }
}

Maze.prototype.setStart = function(x, y, orientation) {
  if (this.isInBound(x,y) && this.isValidDirection(orientation)) {
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;
    return true;
  }
  return false;

};

Maze.prototype.setEnd = function(x, y) {
  if(!this.isInBound(x,y)){
    return false;
  }
  this.endX = x;
  this.endY = y;
  return true;
};

Maze.prototype.setWall = function(x, y, direction) {
  if (this.isInBound(x,y) && this.isValidDirection(direction)) {
    this.spaces[x][y].setWall(direction);
    return true;
  }
  return false;
};

Maze.prototype.isValidDirection = function(direction) {
  return this.directions.indexOf(direction) !== -1;
};


Maze.prototype.isInBound = function(x,y){
  return x > 0 && x <= this.width && y > 0 && y <= this.height;
};
