'use strict';

function Robot(){
  this.x = null;
  this.y = null;
  this.orientation = null;
  this.maze = null;
}

Robot.prototype.setMaze= function(maze){
  this.maze = maze;
  this.x = maze.startX;
  this.y = maze.startY;
  this.orientation = maze.startOrientation;
};
