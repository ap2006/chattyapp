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
  // console.log("componentDidMount <App />");
  //connect to server web SocketServer
  this.socket = new WebSocket('ws://localhost:3001');
  //make event listener on new messages coming from Server
  this.socket.onopen = () => {
    // console.log('making my event listener')
  };
  // get messages and
    this.socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
  // code to handle incoming message
      switch(parsed.type) {
        case "incomingMessage":
        const newMessage = {id: parsed.id, username: parsed.message.username, content: parsed.message.content};
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
          console.log("Got incoming message")// handle incoming message
          break;
        case "postNotification":
        const newNotification = {oldName: parsed.oldName, newName: parsed.newName, type: parsed.type, id: parsed.id};
        const msgs = this.state.messages.concat(newNotification)
        this.setState({messages: msgs})
          console.log("Got a notification", parsed)// handle incoming notification

          break;
          case "activeUsers":
          this.setState( {users: parsed.count} )
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + parsed.type);
          //code to handle user count
        }
    }
}

addMessage = (content) => {
  const newMessage = {content:content,
    username:this.state.currentUser.name}
    this.socket.send(JSON.stringify(newMessage));
  // console.log(this);
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
