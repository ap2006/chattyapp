import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
      <img className="logo" src="/images/adele2.gif"/>
      <a href="/" className="navbar-brand">Hello, it's me</a>
      <p className="active-users">There are {this.props.userCount} Adele fans online</p>
    </nav>
    );
  }
}
export default NavBar;
