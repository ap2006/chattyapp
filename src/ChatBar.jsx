

import React, {Component} from 'react';

class ChatBar extends Component {
//set state of username until event trigger
  state = {currentUser: this.props.currentUser}

//if user clicks ENTER, their new name will get generated
  changeNameOnEnter = (event) => {
    if (event.key == 'Enter') {
      this.props.newUsername(event)
    }
  }

// changes username state as user types in name  until ENTER is triggered.
  handleNameChange = (event) => {
    const currentUser = { name: event.target.value }
    this.setState({ currentUser });
  }
//changes message that's being entered
  handleEnter = (e) => {
    if (e.key == "Enter") {
      if (this.state.currentUser.name != this.props.currentUser.name) {
        this.props.changeName(this.state.currentUser.name)
      }

      this.props.newMessage({
        content: e.target.value,
        username: this.state.currentUser.name
      });
      // this.socket.send(JSON.stringify(this.state.messages[this.state.messages.length-1]));
    }
  };
  //render
  render() {
    console.log(this.props);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyUp={this.handleNameChange} defaultValue={this.state.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleEnter} />
      </footer>
    );
  }
}

export default ChatBar;
