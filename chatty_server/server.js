// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require("uuid/v4");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === 1) {
      console.log("Sending data");
      ws.send(data);
    }
  });
};
// Set up a callback that will run when a client connects to the server
//log all active users
wss.on('connection', (ws) => {
  // console.log('Client connected');
  let activeUsers = {
    type: 'activeUsers',
    id: uuid(),
    count: wss.clients.size
  }
  console.log("Here are my active users", activeUsers);
  wss.broadcast(JSON.stringify(activeUsers))

  ws.on("message", data => {
    // console.log("received a message %s", data);
    const messageObject = JSON.parse(data);
    console.log(messageObject);

    if (messageObject.type == "postNotification") {
      messageObject["id"] = uuid();
      console.log("Post Notification Received")
      wss.broadcast(JSON.stringify(messageObject));
    }
    else {
      const msgToBroadcast = {
        id: uuid(),
        message: messageObject,
        type: "incomingMessage"
      };
      wss.broadcast(JSON.stringify(msgToBroadcast));
    }
  });
    // console.log("Here is the message", messageObject.content);

  // Set up a callback for when a client closes the socket(closes their browser).

ws.on('close', (ws) => {
    let activeUsers = {
    type: 'activeUsers',
    id: uuid(),
    count: wss.clients.size
  }})

});
