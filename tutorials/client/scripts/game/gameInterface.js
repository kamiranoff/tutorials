function GameInterface(player,field,selector) {
  this.player = player;
  this.field  = field;
  this.selector = selector;
}



GameInterface.prototype.render = function () {
  $(this.selector).empty().append(this.renderField());
};

GameInterface.prototype.renderField = function () {
  var $field = $("<div class='maze'>");
  var $fieldRow, $fieldTile;
  for (var y=this.field.height; y >= 1; y -=1 ){
    $fieldRow = $('<div class="mazeRow">').appendTo($field);
    for (var x=1; x <= this.field.width; x +=1 ){
      $fieldTile = $('<div class="mazeSpace">').appendTo($fieldRow);

    }
  }
  return $field;
};

