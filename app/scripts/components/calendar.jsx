'use strict';

var React = require('react'),

		Navigation = require('./navigation.jsx'),
    Calendar = React.createClass({
      render: function() {
        return (
				<div>	
					<Navigation />
          <h1 className="Calendar">calendar</h1>
				</div>	
        )
      }
    });

module.exports = Calendar;
