'use strict';

var React = require('react'),
Navbar = require('react-bootstrap').Navbar,
Nav = require('react-bootstrap').Nav,
NavItem = require('react-bootstrap').NavItem,
DropdownButton = require('react-bootstrap').DropdownButton,
MenuItem = require('react-bootstrap').MenuItem,
    Navigation = React.createClass({
      render: function() {
        return (
    <Navbar>
			<Nav className="navbar-left">
				<span className="navbar-brand">boilerplated-react</span>
        <NavItem eventKey={1} href="#">Dashboard</NavItem>
        <NavItem eventKey={2} href="#inbox">Inbox</NavItem>
      </Nav>
    </Navbar>
  )
     }
    });

module.exports = Navigation;
