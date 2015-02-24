'use strict';

global.$ = global.jQuery = require('jquery');
require('bootstrap');

var React = require('react');
var Router = require('react-router-component');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Inbox = require('./components/inbox.jsx');
var Calendar = require('./components/calendar.jsx');
var Dashboard = require('./components/dashboard.jsx');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Navbar = require('react-bootstrap').Navbar;

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;


var NavMain = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string
  },

  render: function () {
    var brand = <InternalLink href="/" className="navbar-brand">React Bootstrap</InternalLink>;

    return (
      <Navbar componentClass='header' brand={brand} staticTop className="bs-docs-nav" role="banner" toggleNavKey={0}>
        <Nav className="bs-navbar-collapse" role="navigation" eventKey={0} id="top">
          {Object.keys(NAV_LINKS).map(this.renderNavItem)}
        </Nav>
      </Navbar>
    );
  },

  renderNavItem: function (linkName) {
    var link = NAV_LINKS[linkName];

    return (
        <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
          <InternalLink href={link.link}>{link.title}</InternalLink>
        </li>
      );
  }
});



var App = React.createClass({
  render: function () {
    return (
      <div>
      	<NavMain activePage="home" /> 
      </div>
    );
  }
});

React.render(React.createFactory(App), document.getElementById('content'));

//Router.run(routes, function (Handler) {
//  React.render(<Handler/>, document.getElementById('content'));
//});

//				<NavItem eventKey={1} href="#">Link</NavItem>
//        <NavItem eventKey={2} href="#">Link</NavItem>
//        <DropdownButton eventKey={3} title="Dropdown">
//          <MenuItem eventKey="1">Action</MenuItem>
//          <MenuItem eventKey="2">Another action</MenuItem>
//          <MenuItem eventKey="3">Something else here</MenuItem>
//          <MenuItem divider />
//          <MenuItem eventKey="4">Separated link</MenuItem>
//        </DropdownButton>

