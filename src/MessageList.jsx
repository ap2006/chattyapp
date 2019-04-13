import React, {Component} from 'react';
import Message from './Message.jsx';
import Notifications from './Notifications.jsx'

class MessageList extends Component {

  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((message) => {
            if (message.type == "postNotification") {
              return (
                <Notifications key={message.id} oldName={message.oldName} newName={message.newName} />
              )
            }
            else {
            return (
              <Message key={message.id} username={message.username} content={message.content} />
            )
            }
          })
        }
      </main>
    );
  }
}
export default MessageList;
