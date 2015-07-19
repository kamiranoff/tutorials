'use strict';

//Maze Space Object
function MazeSpace(directions) {
  var i;
  for(i=0;i < directions.length;i+=1){
    this[directions[i]] = false;
  }
}

MazeSpace.prototype.setWall = function(direction) {
  this[direction] = true;
};
