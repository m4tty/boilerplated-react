'use strict';

var React = require('react'),

		Navigation = require('./navigation.jsx'),
    Inbox = React.createClass({
      render: function() {
        return (
					<div><Navigation />
          <h1 className="Inbox">inbox</h1></div>
        )
      }
    });

module.exports = Inbox;
