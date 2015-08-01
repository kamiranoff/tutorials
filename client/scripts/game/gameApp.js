


var field = new Field(12,10);

var gameInterface = new GameInterface('r', field , ".maze-container");


jQuery(document).ready(function($) {
  console.log('Page ready');
  gameInterface.render();
});
