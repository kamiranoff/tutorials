'use strict';

function Robot() {
  this.x = null;
  this.y = null;
  this.orientation = null;
  this.maze = null;
}

Robot.prototype.setMaze = function(maze) {
  this.maze = maze;
  this.x = maze.startX;
  this.y = maze.startY;
  this.orientation = maze.startOrientation;
};

Robot.prototype.turnRight = function() {
  //if robot in Maze or is not facing a valid direction
  if (!this.maze || !this.maze.isValidDirection(this.orientation)) {
    return false;
  }
  var rights = {
    north: "east",
    east: "south",
    south: "west",
    west: "north"
  };
  //set new orientation after a turn is made
  this.orientation = rights[this.orientation];
  return true;
};

Robot.prototype.turnLeft = function() {
  //if robot in Maze or is not facing a valid direction
  if (!this.maze || !this.maze.isValidDirection(this.orientation)) {
    return false;
  }
  var lefts = {
    north: "west",
    east: "north",
    south: "east",
    west: "south"
  };
  //set new orientation after a turn is made
  this.orientation = lefts[this.orientation];
  return true;
};

Robot.prototype.moveForward = function() {
  if (!this.canMoveForward()) {
    return false;
  }
  switch (this.orientation) {
    case "north":
      this.y += 1;
      break;
    case "east":
      this.x += 1;
      break;
    case "south":
      this.y -= 1;
      break;
    case "west":
      this.x -= 1;
      break;
  }
  return true;
};




Robot.prototype.canMoveForward = function() {
  if (!this.maze) {
    return false;
  }
  return this.maze.canMove(this.x, this.y, this.orientation);
};

Robot.prototype.exitMaze = function(steps) {
  if (this.maze) {
    while (steps !== 0) {
      steps -= 1;
      if (this.canMoveForward()) {
        this.moveForward();
        this.turnLeft();
      } else {
        this.turnRight();
      }
      if (this.x === this.maze.endX && this.y === this.maze.endY) {
        return true;
      }
    }
    return false;
  }

};
