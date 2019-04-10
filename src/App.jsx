import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
  }

  // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  //connect to server web SocketServer
  this.socket = new WebSocket('ws://localhost:3001');
  //make event listener on new messages coming from Server
  this.socket.onopen = () => {
    console.log('making my event listener')
  };
  // get messages and
  this.socket.onmessage = this._handleServerMessage;
  }


addMessage = (message) => {
  console.log("App addMessage is being executed");
  console.log(message);
  const newMessage = {id: 99, username:this.state.currentUser.name, content: message};
  const messages = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(newMessage));
  // console.log("Line 50 App jsx");
  // console.log(this);
  // TODO: actually add it to state, see how i did above
  this.setState({messages: messages})

}

render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
