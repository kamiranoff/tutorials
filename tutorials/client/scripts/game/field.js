'use Strict';

function Field(width,height){
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
      this.spaces[x][y] = new Tile(this.directions);
    }
  }

}
