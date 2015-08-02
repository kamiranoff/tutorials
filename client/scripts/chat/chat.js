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
    messages = getNode('.chat-messages'),
    statusDefault = status.textContent;


  var setStatus = function(string) {
    status.textContent = string;
    if (string !== statusDefault) {
      var delay = setTimeout(function() {
        setStatus(statusDefault);
        clearInterval(delay);
      }, 3000);
    }
  };

  //Append messages
  var appendMessageOnOutput = function(data) {

    if (data.length) {
      //loop through the results
      for (var x = 0; x < data.length; x = x + 1) {

        var name = document.createElement('span'),
          message = document.createElement('span'),
          singleMessage = document.createElement('p');

        singleMessage.setAttribute('class', 'chat-message-single-container');
        name.setAttribute('class', 'chat-messages-name');
        message.setAttribute('class', 'chat-messsages-message');

        name.textContent = data[x].name;
        message.textContent = data[x].message;

        messages.insertBefore(singleMessage,messages.firstChild);
        messages.appendChild(singleMessage);
        singleMessage.appendChild(name);
        singleMessage.appendChild(message);

      }
      messages.scrollTop = messages.scrollHeight;
    }
  };

  var checkStatus = function(data) {
    //check if status if an object (and get the message) or a string
    setStatus((typeof data === 'object') ? data.message : data);
    if (data.clear === true) {
      textarea.value = '';
    }
  };

  var emitMessage = function() {
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
  };



  try {
    socket = io.connect('http://127.0.0.1:8080');
  } catch (e) {
    //Set status to warn user
  }

  if (typeof socket !== 'undefined') {

    //listen for output
    socket.on('output', function(data) {
      appendMessageOnOutput(data);
    });

    //listen for a status
    socket.on('status', function(data) {
      checkStatus(data);
    });

    //Send message to server
    emitMessage();
  }




})();
