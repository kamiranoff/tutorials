'use strict';

//Maze Space Object
function Mazespace(directions) {
  for (var i=0; i < directions.length; i +=1 ){
    this[directions[i]] = false;
  }
}


Mazespace.prototype.setWall = function(direction) {
  this[direction] = true;
};

