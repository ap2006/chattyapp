import React, {Component} from 'react';

class Notifications extends Component {
  render() {
    return (
        <div className="notification">
          <span className="notification-content"> {this.props.oldName} changed their name to {this.props.newName} .</span>
        </div>
    );
  }
}
export default Notifications;
