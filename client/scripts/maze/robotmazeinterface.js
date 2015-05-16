function RobotMazeInterface(robot,maze,selector
  ) {
  this.robot = robot;
  this.maze  = maze;
  this.selector = selector;
}

RobotMazeInterface.prototype.canMove = function (x, y, direction) {
  var forwardX, forwardY, forwardDirection;

  if (["north","east","south","west"].indexOf(direction) === -1) {
    return false;
  }

  switch (direction) {
    case "north":
      forwardX = x;
      forwardY = y+1;
      forwardDirection = "south";
      break;
    case "east":
      forwardX = x+1;
      forwardY = y;
      forwardDirection = "west";
      break;
    case "south":
      forwardX = x;
      forwardY = y-1;
      forwardDirection = "north";
      break;
    case "west":
      forwardX = x-1;
      forwardY = y;
      forwardDirection = "east";
      break;
  }

  if (forwardX <= 0 || forwardX > this.maze.width || forwardY <= 0 || forwardY > this.maze.height) {
    return false
  }

  if (this.maze.spaces[x][y][direction]) {
    return false
  }

  if (this.maze.spaces[forwardX][forwardY][forwardDirection]) {
    return false
  }

  return true
}

RobotMazeInterface.prototype.render = function () {
  $(this.selector).empty().append(this.renderMaze(), this.renderControls());
};

RobotMazeInterface.prototype.renderMaze = function () {
  var $maze = $("<div class='maze'>");
  var $mazeRow, $mazeSpace;
  for (var y=this.maze.height; y >= 1; y -=1 ){
    $mazeRow = $('<div class="mazeRow">').appendTo($maze);
    for (var x=1; x <= this.maze.width; x +=1 ){
      $mazeSpace = $('<div class="mazeSpace">').appendTo($mazeRow);
      $mazeSpace.append(this.renderSpace(x,y));
      $mazeSpace.append("&nbsp;")
        .toggleClass('north', !this.canMove(x, y, 'north'))
        .toggleClass('south', !this.canMove(x, y, 'south'))
        .toggleClass('east', !this.canMove(x, y, 'east'))
        .toggleClass('west', !this.canMove(x, y, 'west'));
    }
  }
  return $maze;
}

RobotMazeInterface.prototype.renderSpace = function (x,y) {
  var isRobot = false;
  var isStart = false;
  var isEnd = false;

  if (this.robot !== null && this.robot.x == x && this.robot.y == y) {
      isRobot = true;
  }
  if (this.maze.endX == x && this.maze.endY == y) {
      isEnd = true;
  }
  if (this.maze.startX == x && this.maze.startY == y)  {
      isStart = true;
  }

  if (!isRobot && !isStart && !isEnd) {
    return "";
  }

  var icons = {
    start: "fa fa-crosshairs",
    end: "fa fa-bullseye",
    northRobot: "fa fa-arrow-up",
    eastRobot: "fa fa-arrow-right",
    southRobot: "fa fa-arrow-down",
    westRobot: "fa fa-arrow-left",
    northRobotStart: "fa fa-circle-arrow-up",
    eastRobotStart: "fa fa-circle-arrow-right",
    southRobotStart: "fa fa-circle-arrow-down",
    westRobotStart: "fa fa-circle-arrow-left",
    robotEnd: "fa fa-ok-sign "
  }
  var $space = $('<span>');

  if (isRobot) {
    $space.addClass("robot");
  }
  if (isStart) {
    $space.addClass("start");
  }
  if (isEnd) {
    $space.addClass("end");
  }

  if (isRobot && isEnd) {
    $space.addClass(icons["robotEnd"]);
  } else if (isRobot && isStart) {
    $space.addClass(icons[this.robot.orientation + "RobotStart"]);
  } else if (isRobot) {
    $space.addClass(icons[this.robot.orientation + "Robot"]);
  } else if (isEnd) {
    $space.addClass(icons["end"]);
  } else if (isStart)  {
    $space.addClass(icons["start"]);
  }

  return $space;

}

RobotMazeInterface.prototype.renderControls = function () {
  var interface = this;
  if (interface.robot === null) return false;
  var $actions = $("<div class='actions'>");


  var buttons = {};
  if(typeof interface.robot.turnLeft == 'function') {
    buttons["Turn Left"] = function () {
        interface.robot.turnLeft();
        interface.render();
      };
  }
  if(typeof interface.robot.turnRight == 'function') {
    buttons["Turn Right"] = function () {
        interface.robot.turnRight();
        interface.render();
      };
  }
  if(typeof interface.robot.moveForward == 'function') {
  buttons["Move Forward"] = function () {
      interface.robot.moveForward();
      interface.render();
    };
  }
  if(typeof interface.robot.canMoveForward == 'function') {
    buttons["Can Move Forward?"] = function () {
        if (interface.robot.canMoveForward()) {
            alert("Yes!");
        } else {
            alert ("No.");
        }
      };
  }
  if(typeof interface.robot.setMaze == 'function') {
    buttons["Place in Maze"] = function () {
        interface.robot.setMaze(interface.maze);
        interface.render();
      };
  }
  if(typeof interface.robot.exitMaze == 'function') {
    buttons["Exit Maze"] = function () {
        if (interface.robot.maze == interface.maze) {
          (function callExitMaze(){
              setTimeout(function() {
                  result = interface.robot.exitMaze(1);
                  interface.render();
                  if (result === false) {
                      callExitMaze();
                  }
                 return result;
              }, 300);
          })();
        }
      };
  }

  for (var label in buttons) {
    if (buttons.hasOwnProperty(label)){
      var $btn = $('<a class="btn">')
        .text(label)
        .appendTo($actions)
        .click(buttons[label]);
    }
  }

  if (this.robot.maze != this.maze) {
    $robot = $('<span class="robot fa fa-child"></span>').appendTo($actions);
  }

  return $actions;
}

