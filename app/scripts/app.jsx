
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var Dashboard = require('./components/dashboard.jsx');
var Calendar = require('./components/calendar.jsx');
var Inbox = require('./components/inbox.jsx');
var NotFoundPage = require('./components/inbox.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
       <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});


//        <header>
//          <ul>
//            <li><Link to="app">Dashboard</Link></li>
//            <li><Link to="inbox">Inbox</Link></li>
//            <li><Link to="calendar">Calendar</Link></li>
//          </ul>
//          Logged in as Jane
//        </header>
 




//
//
//'use strict';
//
//var React = require('react');
//var Router = require('react-router-component');
//
//var HomePage = require('./components/dashboard.jsx');
//var GettingStartedPage = require('./components/calendar.jsx');
//var ComponentsPage = require('./components/inbox.jsx');
//var NotFoundPage = require('./components/inbox.jsx');
//
//var Locations = Router.Locations;
//var Location = Router.Location;
//var NotFound = Router.NotFound;
//
//var PagesHolder = React.createClass({
//  render: function () {
//    return (
//        <Locations contextual>
//          <Location path="/" handler={HomePage} />
//          <Location path="/index.html" handler={HomePage} />
//          <Location path="/getting-started.html" handler={GettingStartedPage} />
//          <Location path="/components.html" handler={ComponentsPage} />
//          <NotFound handler={NotFoundPage} />
//        </Locations>
//      );
//  }
//});
//
//var Root = React.createClass({
//  statics: {
//
//    /**
//     * Get the doctype the page expects to be rendered with
//     *
//     * @returns {string}
//     */
//    getDoctype: function () {
//      return '<!doctype html>';
//    },
//
//    /**
//     * Get the list of pages that are renderable
//     *
//     * @returns {Array}
//     */
//    getPages: function () {
//      return [
//        'index.html',
//        'getting-started.html',
//        'components.html'
//      ];
//    },
//
//    renderToString: function (props) {
//      return Root.getDoctype() +
//        React.renderToString(<Root {...props} />);
//    },
//
//    /**
//     * Get the Base url this app sits at
//     * This url is appended to all app urls to make absolute url's within the app.
//     *
//     * @returns {string}
//     */
//    getBaseUrl: function () {
//      return '/';
//    }
//  },
//
//  render: function () {
//    return (
//            <Locations path={Root.getBaseUrl() + this.props.initialPath}>
//              <Location path={Root.getBaseUrl() + '*'} handler={PagesHolder} />
//            </Locations>
//      );
//  }
//});
//Router.run(routes, function (Root) {
//React.render(Root, document.getElementById("content"));
//});
//
