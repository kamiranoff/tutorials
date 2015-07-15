/**
 *
 * Watching Object Oriented Javascript (tutorials/javascript/vanilla/)
 * part 1 (17min)
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

    var x,y;
    for( x = 1; x <= width; x +=1 ){
      this.spaces[x] = [];
      for( y=1;y<= height; y+=1){
        this.spaces[x][y] = "(" + x + "," + y + ")";
      }
    }
}

//Available in all our Maze instances
Maze.prototype.setStart = function(x, y, orientation) {
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;
};

Maze.prototype.setEnd = function(x, y) {
    this.endX = x;
    this.endY = y;
};
