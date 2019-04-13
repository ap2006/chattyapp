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
wss.on('connection', (ws) => {
//set up an object to obtain all active users then show them online to anyone on the site
  let activeUsers = {
    type: 'activeUsers',
    id: uuid(),
    count: wss.clients.size
  }
  wss.broadcast(JSON.stringify(activeUsers))

//Receive messages, parse data and then broadcast that so that all people on the site can see
  ws.on("message", data => {
    const messageObject = JSON.parse(data);

    if (messageObject.type == "postNotification") {
      messageObject["id"] = uuid();
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

  // Set up a callback for when a client closes the socket(closes their browser).

ws.on('close', (ws) => {
    let activeUsers = {
      type: 'activeUsers',
      id: uuid(),
      count: wss.clients.size
    }})
});
