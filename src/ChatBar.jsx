

import React, {Component} from 'react';

class ChatBar extends Component {
//if user clicks ENTER, their new name will get generated
  changeNameOnEnter = (event) => {
    if (event.key == 'Enter') {
      this.props.changeName(event.target.value);
    }
  }

//changes message that's being entered
  handleEnter = (e) => {
    if (e.key == "Enter") {
      this.props.newMessage(e.target.value);
      // this.socket.send(JSON.stringify(this.state.messages[this.state.messages.length-1]));
    }
  };
  //render
  render() {
    console.log(this.props);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this.changeNameOnEnter} defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleEnter} />
      </footer>
    );
  }
}

export default ChatBar;
