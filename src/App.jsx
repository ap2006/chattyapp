import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: []
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
      console.log("Here is my message data", parsed);
      const newMessage = {id: parsed.id, username: parsed.message.username, content: parsed.message.content};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
  // code to handle incoming message
    }
}

addMessage = (newMessage) => {
  // console.log("App addMessage is being executed");
  // console.log(message);
    this.socket.send(JSON.stringify(newMessage));
  // console.log(this);
}

// updates state IF user changes name (default is anonymous)

changeName = (newName) => {
      // console.log('fjdksfjdksalfjdksla', this.state.currentUser)
      this.setState({currentUser: {name: newName}})
  }

render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage} changeName={this.changeName} />
      </div>
    );
  }
}
export default App;
