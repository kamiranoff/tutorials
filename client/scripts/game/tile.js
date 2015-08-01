'use strict';

//Maze Space Object
function Tile(directions) {
  var i;
  for(i=0;i < directions.length;i+=1){
    this[directions[i]] = false;
  }
}

Tile.prototype.setWall = function(direction) {
  this[direction] = true;
};
