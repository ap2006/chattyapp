

import React, {Component} from 'react';

class ChatBar extends Component {
  handleEnter = (e) => {
    if (e.key == "Enter") {
      this.props.newMessage(e.target.value);
      // this.socket.send(JSON.stringify(this.state.messages[this.state.messages.length-1]));
    }
  };
  render() {
    console.log(this.props);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleEnter} />
      </footer>
    );
  }
}

export default ChatBar;
