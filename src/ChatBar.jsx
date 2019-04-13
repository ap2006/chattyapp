

import React, {Component} from 'react';

class ChatBar extends Component {
//if user clicks ENTER, their new name will get generated
  changeNameOnEnter = (event) => {
    if (event.key == 'Enter') {
      this.props.changeName(event.target.value);
    }
  }
//if user enters a new message, it will be generated on hitting the ENTER key
  handleEnter = (e) => {
    if (e.key == "Enter") {
      this.props.newMessage(e.target.value);
    }
  };
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
