import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="active-users">There are {this.props.userCount} users online</p>
    </nav>
    );
  }
}
export default NavBar;
