/**
*
* Watching Object Oriented Javascript (tutorials/javascript/vanilla/)
* part 1 (14min)
**/


var MAZE = (function() {
  'use strict';
  var a = {};
  // body...
  a.Maze = function(width, height) {
    this.width = width;
    this.height = height;

    this.startX = null;
    this.startY = null;
    this.startOrientation = null;
    this.endX = null;
    this.endY = null;
  };

  a.Maze.prototype.setStart = function (x,y,orientation) {
    // body...
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;

  };

  a.Maze.prototype.setEnd = function(x,y){
    this.endX = x;
    this.endY = y;
  };


  a.m = new a.Maze(7,5);
  a.m.setStart(1,1,"north");

  console.log(a.m);
  return a;
})(MAZE);
