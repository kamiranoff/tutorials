/**
*
* server side on server/chat/chatController.js
*
**/


(function() {
  "use strict";

  var socket;
  var getNode = function(selector) {
    return document.querySelector(selector);
  };

  //get required nodes
  var status = getNode('.chat-status span'),
    textarea = getNode('.chat textarea'),
    chatName = getNode('.chat-name'),
    statusDefault = status.textContent;


  var setStatus = function(string) {
    status.textContent = string;

    if(string !== statusDefault){
      var delay = setTimeout(function(){
        setStatus(statusDefault);
        clearInterval(delay);
      }, 3000);
    }
  };



  try {
    socket = io.connect('http://127.0.0.1:8080');
  } catch (e) {
    //Set status to warn user
  }

  if (typeof socket !== 'undefined') {
    //listen for a status
    socket.on('status', function(data) {
      //check if status if an object (and get the message) or a string
      setStatus( (typeof data === 'object') ? data.message : data );


      if(data.clear === true){
        textarea.value = '';
      }
    });


    //Listen for keydown
    textarea.addEventListener('keydown', function(event) {
      /* Act on the event */
      var self = this,
        name = chatName.value;

      if (event.which === 13 && event.shiftKey === false) {
        socket.emit('userInput', {
          name: name,
          message: self.value
        });
        event.preventDefault();
      }
    });
  }




})();
