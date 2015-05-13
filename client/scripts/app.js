// /*
// /**
//  * @name someFunction
//  * @author
//  *
//  * Basic usage:
//  * someFunction();
//  *
//  * additionally you can use methods like someFunction.methodName();
//  *
//  * Advanced usage:
//  * someFunction({
//  *      "additionalOption": "thatCanOvervriteDefaults"
//  * });
//  */
// function someFunction(opts) {
//     //assign _root and config private variables
//     var _root = this;
//     var _cfg = $.extend({
//         "someOption":       "some value"
//     }, opts);

//     /*
//         INITIALIZE
//     */
//     this.init = function() {
//         //some code
//         _somePrivateMethod();
//         _root.somePublicMethod();
//     }
//     /*
//         Some Private Method (no "this")
//     */
//     _somePrivateMethod = function() {
//         //some code
//         console.log("_somePrivateMethod");
//     }
//     /*
//         Some Public Method
//     */
//     this.somePublicMethod = function() {
//         //some code
//         console.log("somePublicMethod");
//     }
//     /*********************
//      *   AUTO INITIALIZE
//      **********************/
//      this.init();
// }

// //declaration and initialization of someFunction
// someFunction();*/

//someFunction._somePrivateMethod();
//returns: TypeError: someFunction._somePrivateMethod is not a function

//someFunction.somePublicMethod();
//returns: "somePublicMethod"
var MODULE = (function ($) {
  'use strict';
  var my = {},
    privateVariable = 1;

  function privateMethod() {
    // ...
  }

  $('.welcome-message').html('You are online, Enjoy.');

  my.moduleProperty = 1;
  my.moduleMethod = function () {
    // ...
  };
  return my;
}(jQuery));




var mainController = (function(){

});


