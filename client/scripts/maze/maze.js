/**
 *
 * Watching Object Oriented Javascript (tutorials/javascript/vanilla/)
 * part 1 (38.46min)
 **/
"use strict";

//Maze Object - constructor function

function Maze(width, height) {
  this.width = width;
  this.height = height;

  this.startX = null;
  this.startY = null;
  this.startOrientation = null;
  this.endX = null;
  this.endY = null;
  this.spaces = [];

  this.directions = ['north', 'east', 'south', 'west'];

  var x, y;
  for (x = 1; x <= width; x += 1) {
    this.spaces[x] = [];
    for (y = 1; y <= height; y += 1) {
      this.spaces[x][y] = new MazeSpace(this.directions);
    }
  }
}

//Available in all our Maze instances
Maze.prototype.setStart = function(x, y, orientation) {
  if (this.isInBounds(x, y) && this.isValidDirection(orientation)) {
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;
    return true;
  }
  return false;
};

Maze.prototype.setEnd = function(x, y) {
  if (!this.isInBounds(x, y)) {
    return false;
  }
  this.endX = x;
  this.endY = y;
  return true;
};


Maze.prototype.setWall = function(x, y, direction)  {
  if (this.isInBounds(x, y) && this.isValidDirection(direction)) {
    this.spaces[x][y].setWall(direction);
    return true;
  }
  return false;
};

//validation method
Maze.prototype.isValidDirection = function(direction) {
  return this.directions.indexOf(direction) !== -1;
};

//validation method
Maze.prototype.isInBounds = function(x, y) {
  return (x > 0 && x <= this.width && y > 0 && y <= this.height);
};

Maze.prototype.canMove = function(x, y, direction) {
  // body...
  if (!this.isValidDirection(direction)) {
    return false;
  }
  if (!this.isInBounds(x, y)) {
    return false;
  }
  var forwardX, forwardY;
  switch (direction) {
    case "north":
      forwardX = x;
      forwardY = y + 1;
      break;
    case "east":
      forwardX = x + 1;
      forwardY = y;
      break;
    case "south":
      forwardX = x;
      forwardY = y - 1;
      break;
    case "west":
      forwardX = x - 1;
      forwardY = y;
      break;
  }
  if (!this.isInBounds(forwardX, forwardY)) {
    return false;
  }

  //Check if the space we are on as a wall
  if (this.spaces[x][y][direction]) {
    return false;
  }

  var opposites = {
    north: "south",
    east: "west",
    south: "north",
    west: "east"
  };

  //Check if the we are moving to has a wall on the opposite side
  if (this.spaces[forwardX][forwardY][opposites[direction]]) {
    return false;
  }

  return true;
};
