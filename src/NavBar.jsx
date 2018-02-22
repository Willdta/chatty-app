import React, { Component } from 'react';

class NavBar extends Component {
  render() {

    const { clientCount } = this.props

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p>Current Users: { clientCount }</p>
      </nav>
    )
  }
}

export default NavBar;