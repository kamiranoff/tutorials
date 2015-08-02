/**
*
* client side on client/scripts/chat/chat.js
*
**/


var mongo = require('mongodb').MongoClient,
    io = require('socket.io')(8080).sockets,
    util = require('util'),
    validator = require('validator');

module.exports = function(env, logger) {


  logger.info('Database', env.chatdb);

  mongo.connect(env.chatdb, function(err, db) {
    if (err) {
      throw err;
    }
    io.on('connection', function(socket) {
      logger.info('connected to db chat');

      var messageCollection = db.collection('messages'),
          sendStatus = function(string) {
          socket.emit('status', string);
      };

      /*==========  Emit all messages  ==========*/
      messageCollection.find().limit(100).sort({ _id:1}).toArray(function(err,res){
        if(err){
          throw err;
        }
        socket.emit('output',res);
      });


      /*==========  Listening for inputs  ==========*/

      socket.on('userInput', function(data) {
        //stripLow(input [, keep_new_lines]) - remove characters with a numerical value < 32 and 127, mostly control characters.
        //If keep_new_lines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD). Unicode-safe in JavaScript.
        var name = validator.stripLow(data.name),
          message = validator.stripLow(data.message,true),
          whiteSpacePattern = /^\s*$/;


        //checking for white spaces
        if (whiteSpacePattern.test(name) || whiteSpacePattern.test(message)) {
          logger.warn('white space only found. Not inserting that in the db. Sorry');
          sendStatus('A name and a message is required');


        }else if(!validator.isLength(name,1,50)){
          logger.warn('Name is too long. Not inserting that in the db. Sorry');
          sendStatus('Your name is either too short or too long');

        }else if(!validator.isLength(message,1,300)){
          logger.warn('Message is too long. Not inserting that in the db. Sorry');
          sendStatus('Your message is either too short or too long');


        //insert message to db and send response to client
        } else {
          //validation before saving into db;
          var messageObject = {
            name: name,
            message: message
          };
         messageCollection.insert(messageObject, function() {
            logger.info('inserted: ' + message);

            //Emit latest message to ALL clients
            io.emit('output',[data]);

            sendStatus({
              message:'Message sent',
              clear:true
            });

          });
        }
      });
    });
  });
};
