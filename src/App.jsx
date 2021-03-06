import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      users: 0
    };
  }
  // in App.jsx
componentDidMount() {
  //connect to server webSocket
  this.socket = new WebSocket('ws://localhost:3001');
  //make event listener on new messages coming from Server
  this.socket.onopen = () => {
  };
  // get messages and then handle the incoming data
    this.socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
  // code to handle incoming message
      switch(parsed.type) {
  // handle incoming message
        case "incomingMessage":
          const newMessage = {id: parsed.id, username: parsed.message.username, content: parsed.message.content};
          const messagesOld = this.state.messages
          messagesOld.push(newMessage)
          console.log(messagesOld)
          this.setState({messages: messagesOld})
        break;
        //handle incoming notification for when a user changes their name
        case "postNotification":
          const newNotification = {oldName: parsed.oldName, newName: parsed.newName, type: parsed.type, id: parsed.id};
          const msgs = this.state.messages.concat(newNotification)
          this.setState({messages: msgs})
        break;
        //handle user count
        case "activeUsers":
          this.setState( {users: parsed.count} )
        break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + parsed.type);
        }
    }
}
//add a new message
addMessage = (content) => {
  const newMessage = {content:content,
    username:this.state.currentUser.name}
    this.socket.send(JSON.stringify(newMessage));
}

// updates state IF user changes name (default is anonymous)
changeName = (namechange) => {
  console.log("we are here", namechange);
  const newName = {oldName:this.state.currentUser.name,
                  newName: namechange,
                  type:"postNotification" }
    this.socket.send(JSON.stringify(newName))
    this.setState({currentUser: {name: namechange}})
  }
render() {
    return (
      <div>
        <NavBar userCount={this.state.users} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage} changeName={this.changeName} />
      </div>
    );
  }
}
export default App;
