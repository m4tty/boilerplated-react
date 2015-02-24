'use strict';

var React = require('react'),
		Navigation = require('./navigation.jsx'),
    Dashboard = React.createClass({
      render: function() {
        return (
          <div>
					<Navigation />
					<h1 className="Dashboard">dashboard</h1>
					</div>
        )
      }
    });

module.exports = Dashboard;
