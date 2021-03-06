# Chatty Adele App

Chatty Adele App is a client-side SPA that allows Adele fans to send messages to each other online - no need to register accounts. It was built with React, as well as modern tools for Node including Webpack and Babel.

The Chatty Adele App contains a chat log displaying messages and notifications. It also has an input field where a fan can change their name and a separate input field where a fan can send a message. The app communicates with a server via WebSockets for multi-user real-time updates. Adele fans who are online can see the total number of other fans online by checking the number in the top right corner.
Fans can also see a fun gif of Adele blinking at them as they type and wait for messages (top left).

## Screenshots

Chatty Adele App Homepage:

!["Homepage on Load"](https://github.com/ap2006/chattyapp/blob/master/docs/chatty_adele_app_no_chats.png?raw=true)

Chatty Adele App multi-fan Conversation:

!["3 Adele Fans Chatting"](https://github.com/ap2006/chattyapp/blob/master/docs/chatty_adele_app_multiple_fans.png?raw=true)


## Dependencies

Dependencies for the Chatty Client:
- React
- React-dom
- Webpack
- Babel
- Express
- Ws

Dependencies for the Chatty Server:
- Express
- UUID
- Ws

## How to use
- Install all the above dependencies using the `npm install` command
- Run the web server using the `npm start` command in the terminal while inside the correct folder directory (the client folder is 'chatty' and the server folder is inside chatty and called 'chatty_server').
- Connect to localhost:3000 as a client
- Open another browser and connect as a client. You should see the user count update on the top right.
- Start chatting!
